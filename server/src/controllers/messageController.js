import Message from '../models/Message.js';
import User from '../models/User.js';
import { generateAIResponse } from '../utils/aiResponder.js';
import { getIO } from '../utils/socket.js';

export const getMessages = async (req, res, next) => {
  try {
    const { recipientId } = req.params;
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId },
      ],
    }).sort({ createdAt: 1 });

    await Message.updateMany(
      {
        sender: recipientId,
        recipient: userId,
        isRead: false,
      },
      { isRead: true }
    );

    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { recipientId, text } = req.body;
    const userId = req.user._id;

    if (!recipientId || !text) {
      return res.status(400).json({ error: 'Recipient and text are required' });
    }

    const message = await Message.create({
      sender: userId,
      recipient: recipientId,
      text,
      isRead: false,
    });

    // Respond immediately to the sender
    res.status(201).json({ message });

    // Emit realtime event if Socket.io is active
    try {
      const io = getIO();
      if (io) {
        io.to(`user:${recipientId}`).emit('message:new', { message });
        io.to(`user:${userId}`).emit('message:sent', { message });
      }
    } catch (err) {
      console.error('Error emitting socket message event:', err);
    }

    // Look up the recipient to generate the AI response in the background
    const recipient = await User.findById(recipientId);
    if (recipient) {
      setTimeout(async () => {
        try {
          console.log(`Generating AI response for message from ${userId} to ${recipientId}...`);
          const replyText = await generateAIResponse(recipient, text);
          console.log(`Generated reply: "${replyText}"`);
          await Message.create({
            sender: recipientId,
            recipient: userId,
            text: replyText,
          });
            // Emit AI reply via sockets
            try {
              const io = getIO();
              if (io) {
                // fetch the created reply to include timestamps
                const reply = await Message.findOne({ sender: recipientId, recipient: userId, text: replyText }).sort({ createdAt: -1 }).lean();
                if (reply) {
                  io.to(`user:${userId}`).emit('message:new', { message: reply });
                }
              }
            } catch (err) {
              console.error('Error emitting AI reply via socket:', err);
            }
        } catch (err) {
          console.error('Error generating AI reply in controller:', err);
        }
      }, 1500);
    }
  } catch (error) {
    next(error);
  }
};
