import User from '../models/User.js';
import Connection from '../models/Connection.js';

const buildMatchScore = (currentUser, candidate, filterTags = []) => {
  let score = 0;

  const sameDepartment = currentUser.department && candidate.department && currentUser.department === candidate.department;
  const sameUniversity = currentUser.university && candidate.university && currentUser.university === candidate.university;
  const sameGraduationYear = currentUser.graduationYear && candidate.graduationYear && currentUser.graduationYear === candidate.graduationYear;

  const sharedInterests = Array.isArray(currentUser.interests) && Array.isArray(candidate.interests)
    ? currentUser.interests.filter((interest) => candidate.interests.includes(interest))
    : [];

  const interestMatchCount = sharedInterests.length;
  const filterMatchCount = Array.isArray(filterTags) && filterTags.length
    ? candidate.interests.filter((interest) => filterTags.includes(interest)).length
    : 0;

  if (sameDepartment) score += 30;
  if (sameUniversity) score += 12;
  if (sameGraduationYear) score += 10;

  score += interestMatchCount * 8;
  score += filterMatchCount * 4;

  if (currentUser.role === 'student' && candidate.role === 'alumni') {
    score += 24;
    if (sameDepartment) score += 14;
  } else if (currentUser.role === 'alumni' && candidate.role === 'student') {
    score += 14;
    if (sameDepartment) score += 10;
  } else if (currentUser.role === candidate.role) {
    score += 8;
    if (sameDepartment) score += 8;
  }

  if (candidate.company && currentUser.role === 'student') {
    score += 4;
  }

  return score;
};
export const getCards = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const departmentFilter = req.query.department?.toString().trim();
    const graduationYearFilter = req.query.graduationYear ? parseInt(req.query.graduationYear.toString(), 10) : undefined;
    const interestTags = req.query.interests
      ? req.query.interests.toString().split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

    // Get all connection records where current user is requester or recipient
    const existingConnections = await Connection.find({
      $or: [{ requester: userId }, { recipient: userId }],
    });

    // Extract target user IDs
    const excludedIds = existingConnections.reduce((acc, conn) => {
      const otherId = conn.requester.toString() === userId.toString() ? conn.recipient : conn.requester;
      acc.add(otherId.toString());
      return acc;
    }, new Set([userId.toString()]));

    const query = {
      _id: { $nin: Array.from(excludedIds) },
    };

    if (departmentFilter) {
      query.department = departmentFilter;
    }

    if (!Number.isNaN(graduationYearFilter)) {
      query.graduationYear = graduationYearFilter;
    }

    if (interestTags.length) {
      query.interests = { $in: interestTags };
    }

    const currentUser = await User.findById(userId).lean();
    if (!currentUser) {
      return res.status(404).json({ error: 'Current user not found' });
    }

    const candidates = await User.find(query).lean();

    const cards = candidates
      .map((candidate) => ({
        ...candidate,
        matchScore: buildMatchScore(currentUser, candidate, interestTags),
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 50);

    res.status(200).json({ cards });
  } catch (error) {
    next(error);
  }
};

export const swipe = async (req, res, next) => {
  try {
    const { targetUserId, action } = req.body;
    const userId = req.user._id;

    if (!targetUserId || !['like', 'pass'].includes(action)) {
      return res.status(400).json({ error: 'Invalid swipe parameters' });
    }

    if (action === 'pass') {
      // Create a declined connection to prevent showing this user again
      await Connection.create({
        requester: userId,
        recipient: targetUserId,
        status: 'declined',
      });
      return res.status(200).json({ isMatch: false });
    }

    // For demo purposes, make every 'like' swipe an instant match!
    await Connection.create({
      requester: userId,
      recipient: targetUserId,
      status: 'accepted',
    });

    res.status(200).json({ isMatch: true });
  } catch (error) {
    next(error);
  }
};
