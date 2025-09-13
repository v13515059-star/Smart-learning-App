const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Course = require('../models/Course');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { generateCourseContent } = require('../utils/courseGenerator');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Get all courses for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get single course by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Create course from YouTube URL
router.post('/youtube', auth, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'YouTube URL is required' });
    }

    // Generate course content
    const courseData = generateCourseContent('youtube', { url });
    
    // Create course in database
    const course = new Course({
      ...courseData,
      userId: req.userId,
      videoUrl: url
    });

    await course.save();

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $inc: { 'stats.totalCourses': 1 }
    });

    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    console.error('Create YouTube course error:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Create course from PDF upload
router.post('/pdf', auth, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    // Generate course content based on file
    const courseData = generateCourseContent('pdf', {
      filename: req.file.originalname,
      size: req.file.size
    });

    // Create course in database
    const course = new Course({
      ...courseData,
      userId: req.userId,
      originalFileName: req.file.originalname,
      fileSize: req.file.size
    });

    await course.save();

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $inc: { 'stats.totalCourses': 1 }
    });

    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    console.error('Create PDF course error:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update course progress
router.put('/:id/progress', auth, async (req, res) => {
  try {
    const { progress } = req.body;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({ error: 'Progress must be between 0 and 100' });
    }

    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { 
        progress,
        ...(progress === 100 && { completedAt: new Date() })
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Update user stats if course is completed
    if (progress === 100 && !course.completedAt) {
      await User.findByIdAndUpdate(req.userId, {
        $inc: { 'stats.completedCourses': 1 }
      });
    }

    res.json({
      message: 'Progress updated successfully',
      course
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Delete course
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $inc: { 
        'stats.totalCourses': -1,
        ...(course.progress === 100 && { 'stats.completedCourses': -1 })
      }
    });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

module.exports = router;