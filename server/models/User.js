const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: null
  },
  preferences: {
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark'
    },
    language: {
      type: String,
      default: 'en'
    },
    emailDigest: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'never'],
      default: 'weekly'
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  notifications: {
    courseComplete: {
      type: Boolean,
      default: true
    },
    quizResults: {
      type: Boolean,
      default: true
    },
    weeklyProgress: {
      type: Boolean,
      default: false
    },
    newFeatures: {
      type: Boolean,
      default: true
    }
  },
  privacy: {
    profileVisible: {
      type: Boolean,
      default: true
    },
    progressVisible: {
      type: Boolean,
      default: false
    },
    achievementsVisible: {
      type: Boolean,
      default: true
    }
  },
  stats: {
    totalCourses: {
      type: Number,
      default: 0
    },
    completedCourses: {
      type: Number,
      default: 0
    },
    totalHours: {
      type: Number,
      default: 0
    },
    averageProgress: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);