import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import discoveryRoutes from './routes/discovery.js';
import connectionRoutes from './routes/connections.js';
import messageRoutes from './routes/messages.js';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import { initIO } from './utils/socket.js';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/discovery', discoveryRoutes);
app.use('/api/v1/connections', connectionRoutes);
app.use('/api/v1/messages', messageRoutes);

app.use('*', (req, res, next) => {
  res.status(404).json({ error: `Not Found - ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: Object.values(err.errors).map(val => val.message).join(', ') });
  }

  if (err.code === 11000) {
    return res.status(400).json({ error: 'Duplicate field value entered' });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Resource not found' });
  }

  res.status(500).json({ error: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;

// Create HTTP server and attach Socket.io
const server = http.createServer(app);

const io = new IOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

initIO(io);

// Map userId -> Set(socketIds)
const onlineUsers = new Map();

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication error: token required'));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('+password');
    if (!user) return next(new Error('Authentication error: user not found'));
    socket.user = { id: user._id.toString() };
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', async (socket) => {
  const userId = socket.user.id;
  // add socket id to user's set
  const set = onlineUsers.get(userId) || new Set();
  set.add(socket.id);
  onlineUsers.set(userId, set);

  // join user-specific room for direct emits
  socket.join(`user:${userId}`);

  // mark user online
  try {
    await User.findByIdAndUpdate(userId, { isOnline: true, lastActiveAt: new Date() });
  } catch (err) {
    console.error('Error updating user online status:', err);
  }

  io.emit('user:online', { userId });

  socket.on('message:send', async ({ recipientId, text }) => {
    try {
      const Message = (await import('./models/Message.js')).default;
      const newMsg = await Message.create({ sender: userId, recipient: recipientId, text, isRead: false });

      // Emit to recipient sockets if online
      const recSet = onlineUsers.get(recipientId);
      if (recSet && recSet.size) {
        for (const sid of recSet) io.to(sid).emit('message:new', { message: newMsg });
      }

      // Emit back to sender
      socket.emit('message:sent', { message: newMsg });
    } catch (err) {
      console.error('Socket message:send error', err);
      socket.emit('message:error', { error: 'Could not send message' });
    }
  });

  socket.on('typing', ({ to, isTyping }) => {
    const recSet = onlineUsers.get(to);
    if (recSet && recSet.size) {
      for (const sid of recSet) io.to(sid).emit('typing', { from: userId, isTyping });
    }
  });

  socket.on('disconnect', async () => {
    const set = onlineUsers.get(userId);
    if (set) {
      set.delete(socket.id);
      if (set.size === 0) {
        onlineUsers.delete(userId);
        try {
          await User.findByIdAndUpdate(userId, { isOnline: false, lastActiveAt: new Date() });
        } catch (err) {
          console.error('Error updating user offline status:', err);
        }
        io.emit('user:offline', { userId });
      } else {
        onlineUsers.set(userId, set);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
