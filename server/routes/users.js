const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const courses = await Course.find({ userId: req.userId });

    const totalCourses = courses.length;
    const completedCourses = courses.filter(c => c.progress === 100).length;
    const totalHours = courses.reduce((total, course) => {
      const hours = parseFloat(course.duration.split('h')[0]) || 0;
      return total + (hours * course.progress / 100);
    }, 0);
    const averageProgress = totalCourses > 0 
      ? Math.round(courses.reduce((total, course) => total + course.progress, 0) / totalCourses)
      : 0;

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      'stats.totalCourses': totalCourses,
      'stats.completedCourses': completedCourses,
      'stats.totalHours': Math.round(totalHours),
      'stats.averageProgress': averageProgress
    });

    res.json({
      stats: {
        totalCourses,
        completedCourses,
        totalHours: Math.round(totalHours),
        averageProgress
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Update user preferences
router.put('/preferences', auth, async (req, res) => {
  try {
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { preferences },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Update notification settings
router.put('/notifications', auth, async (req, res) => {
  try {
    const { notifications } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { notifications },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Notification settings updated successfully',
      notifications: user.notifications
    });
  } catch (error) {
    console.error('Update notifications error:', error);
    res.status(500).json({ error: 'Failed to update notification settings' });
  }
});

// Update privacy settings
router.put('/privacy', auth, async (req, res) => {
  try {
    const { privacy } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { privacy },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Privacy settings updated successfully',
      privacy: user.privacy
    });
  } catch (error) {
    console.error('Update privacy error:', error);
    res.status(500).json({ error: 'Failed to update privacy settings' });
  }
});

module.exports = router;