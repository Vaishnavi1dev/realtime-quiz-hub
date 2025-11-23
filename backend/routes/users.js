const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Result = require('../models/Result');
const auth = require('../middleware/auth');

// @route   GET /api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/leaderboard
// @desc    Get leaderboard
// @access  Private
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const results = await Result.aggregate([
      {
        $group: {
          _id: '$studentId',
          totalScore: { $sum: '$score' },
          quizzesTaken: { $sum: 1 },
          avgScore: { $avg: '$score' }
        }
      },
      {
        $sort: { totalScore: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const leaderboard = await User.populate(results, {
      path: '_id',
      select: 'name email rollNo'
    });

    res.json(leaderboard);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/results
// @desc    Get user's quiz results
// @access  Private
router.get('/results', auth, async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.user.id })
      .populate('quizId', 'title difficulty')
      .sort({ completedAt: -1 });
    
    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
