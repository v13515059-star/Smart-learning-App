import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getCourses } from '../utils/courseGenerator';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  BookOpen, 
  Clock, 
  Edit3,
  Camera,
  Save,
  X
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  const courses = getCourses();

  const totalHours = courses.reduce((total, course) => {
    const hours = parseFloat(course.duration.split('h')[0]) || 0;
    return total + (hours * course.progress / 100);
  }, 0);

  const completedCourses = courses.filter(course => course.progress === 100).length;
  const avgProgress = courses.length > 0 ? 
    Math.round(courses.reduce((total, course) => total + course.progress, 0) / courses.length) : 0;

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
  };

  const achievements = [
    { title: 'First Course', description: 'Created your first course', earned: true, date: '2024-01-15' },
    { title: 'Quiz Master', description: 'Scored 100% on 5 quizzes', earned: true, date: '2024-01-20' },
    { title: 'Learning Streak', description: '7 days of continuous learning', earned: true, date: '2024-01-25' },
    { title: 'Course Creator', description: 'Created 10 courses', earned: false, progress: 30 },
    { title: 'Knowledge Seeker', description: 'Completed 20 courses', earned: false, progress: 65 },
    { title: 'Flashcard Champion', description: 'Reviewed 1000 flashcards', earned: false, progress: 45 }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-xl text-gray-300">Manage your account and track your learning journey</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-2 text-white hover:bg-emerald-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center space-x-2 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <User className="w-5 h-5" />
                      <span>{user?.name || 'User'}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Mail className="w-5 h-5" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Calendar className="w-5 h-5" />
                      <span>Joined January 2024</span>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Courses Created</span>
                  <span className="text-white font-semibold">{courses.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Hours Learned</span>
                  <span className="text-white font-semibold">{Math.round(totalHours)}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Completed</span>
                  <span className="text-white font-semibold">{completedCourses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Avg Progress</span>
                  <span className="text-white font-semibold">{avgProgress}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.earned
                        ? 'bg-emerald-500/20 border-emerald-500/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned ? 'bg-emerald-500' : 'bg-gray-600'
                      }`}>
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          achievement.earned ? 'text-emerald-400' : 'text-gray-300'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                        {achievement.earned ? (
                          <p className="text-xs text-emerald-400">
                            Earned on {new Date(achievement.date!).toLocaleDateString()}
                          </p>
                        ) : (
                          <div className="space-y-1">
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div 
                                className="bg-gradient-to-r from-emerald-400 to-blue-500 h-1 rounded-full transition-all"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400">{achievement.progress}% complete</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;