import User from '../models/User.js';

export const getProfile = (req, res, next) => {
  res.status(200).json({
    user: req.user.toProfileJSON(),
  });
};

export const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['fullName', 'age', 'bio', 'department', 'university', 'location', 'occupationTitle', 'company', 'interests', 'socialLinks'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (field === 'interests' && typeof req.body.interests === 'string') {
          updateData.interests = req.body.interests.split(',').map((i) => i.trim());
        } else {
          updateData[field] = req.body[field];
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      user: updatedUser.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl },
      { new: true }
    );

    res.status(200).json({
      user: updatedUser.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const uploadCover = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const coverUrl = `/uploads/covers/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { coverUrl },
      { new: true }
    );

    res.status(200).json({
      user: updatedUser.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const addSkill = async (req, res, next) => {
  try {
    const { skill } = req.body;
    if (!skill) {
      return res.status(400).json({ error: 'Skill is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { skills: skill } },
      { new: true }
    );

    res.status(200).json({
      user: updatedUser.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const removeSkill = async (req, res, next) => {
  try {
    const { skill } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { skills: skill } },
      { new: true }
    );

    res.status(200).json({
      user: updatedUser.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      user: user.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ error: 'Not allowed in production' });
    }

    const users = await User.find().lean();
    const profiles = users.map((user) => {
      const data = { ...user };
      delete data.password;
      return data;
    });

    res.status(200).json({ users: profiles });
  } catch (error) {
    next(error);
  }
};
