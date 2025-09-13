const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: true
  },
  explanation: {
    type: String,
    required: true
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [questionSchema]
});

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: null
  },
  duration: {
    type: String,
    required: true
  },
  lessons: {
    type: Number,
    required: true
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  type: {
    type: String,
    enum: ['youtube', 'pdf'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: [noteSchema],
  quizzes: [quizSchema],
  flashcards: [flashcardSchema],
  originalFileName: {
    type: String,
    default: null
  },
  fileSize: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    enum: ['technology', 'science', 'business', 'arts', 'general'],
    default: 'general'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for better query performance
courseSchema.index({ userId: 1, createdAt: -1 });
courseSchema.index({ type: 1 });
courseSchema.index({ category: 1 });

module.exports = mongoose.model('Course', courseSchema);