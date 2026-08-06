import Connection from '../models/Connection.js';
import Message from '../models/Message.js';

export const getConnections = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find all active connection states
    const connections = await Connection.find({
      $or: [{ requester: userId }, { recipient: userId }],
    }).populate('requester recipient');

    const matches = [];
    const requests = [];
    const sent = [];

    for (const conn of connections) {
      if (conn.status === 'accepted') {
        const otherUser = conn.requester._id.toString() === userId.toString()
          ? conn.recipient
          : conn.requester;

      const lastMessage = await Message.findOne({
        $or: [
          { sender: userId, recipient: otherUser._id },
          { sender: otherUser._id, recipient: userId },
        ],
      })
        .sort({ createdAt: -1 })
        .lean();

      const unreadCount = await Message.countDocuments({
        sender: otherUser._id,
        recipient: userId,
        isRead: false,
      });

      matches.push({
        _id: conn._id,
        user: otherUser.toProfileJSON(),
        status: conn.status,
        createdAt: conn.createdAt,
        lastMessage: lastMessage
          ? {
              text: lastMessage.text,
              createdAt: lastMessage.createdAt,
              sender: lastMessage.sender,
            }
          : null,
        unreadCount,
      });
      } else if (conn.status === 'pending') {
        if (conn.recipient._id.toString() === userId.toString()) {
          requests.push({
            _id: conn._id,
            user: conn.requester.toProfileJSON(),
            status: conn.status,
            createdAt: conn.createdAt,
          });
        } else {
          sent.push({
            _id: conn._id,
            user: conn.recipient.toProfileJSON(),
            status: conn.status,
            createdAt: conn.createdAt,
          });
        }
      }
    }

    res.status(200).json({ matches, requests, sent });
  } catch (error) {
    next(error);
  }
};

export const acceptRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const connection = await Connection.findById(id);
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    if (connection.recipient.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Not authorized to accept this request' });
    }

    connection.status = 'accepted';
    await connection.save();

    res.status(200).json({ message: 'Request accepted' });
  } catch (error) {
    next(error);
  }
};

export const declineRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const connection = await Connection.findById(id);
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    // Requester can cancel pending request; Recipient can decline pending request
    if (
      connection.recipient.toString() !== userId.toString() &&
      connection.requester.toString() !== userId.toString()
    ) {
      return res.status(403).json({ error: 'Not authorized to decline/remove this connection' });
    }

    await Connection.findByIdAndDelete(id);

    res.status(200).json({ message: 'Connection removed successfully' });
  } catch (error) {
    next(error);
  }
};
