import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { getCourses } from '../utils/courseGenerator';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  BookOpen,
  Brain,
  Zap,
  Calendar
} from 'lucide-react';

const Analytics = () => {
  const courses = getCourses();

  // Generate analytics data
  const weeklyData = [
    { day: 'Mon', hours: 2.5, courses: 1 },
    { day: 'Tue', hours: 3.2, courses: 2 },
    { day: 'Wed', hours: 1.8, courses: 1 },
    { day: 'Thu', hours: 4.1, courses: 3 },
    { day: 'Fri', hours: 2.9, courses: 2 },
    { day: 'Sat', hours: 5.2, courses: 4 },
    { day: 'Sun', hours: 3.7, courses: 2 }
  ];

  const progressData = courses.map(course => ({
    name: course.title.substring(0, 20) + '...',
    progress: course.progress,
    type: course.type
  }));

  const categoryData = [
    { name: 'Technology', value: 45, color: '#10B981' },
    { name: 'Science', value: 30, color: '#3B82F6' },
    { name: 'Business', value: 15, color: '#8B5CF6' },
    { name: 'Arts', value: 10, color: '#F59E0B' }
  ];

  const totalHours = courses.reduce((total, course) => {
    const hours = parseFloat(course.duration.split('h')[0]) || 0;
    return total + (hours * course.progress / 100);
  }, 0);

  const avgProgress = courses.length > 0 ? 
    Math.round(courses.reduce((total, course) => total + course.progress, 0) / courses.length) : 0;

  const completedCourses = courses.filter(course => course.progress === 100).length;

  const stats = [
    {
      title: 'Total Learning Hours',
      value: Math.round(totalHours).toString(),
      icon: <Clock className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Courses Completed',
      value: completedCourses.toString(),
      icon: <Award className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      change: '+25%',
      changeType: 'positive'
    },
    {
      title: 'Average Progress',
      value: `${avgProgress}%`,
      icon: <Target className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Learning Streak',
      value: '7 days',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      change: '+2 days',
      changeType: 'positive'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Learning Analytics</h1>
          <p className="text-xl text-gray-300">Track your progress and optimize your learning journey</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.title}</div>
            </div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Weekly Learning Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="hours" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Course Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Course Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Learning Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Learning Categories</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Recent Achievements</h3>
            <div className="space-y-4">
              {[
                { title: 'Course Completion Master', description: 'Completed 5 courses this month', icon: <Award className="w-6 h-6" />, color: 'text-yellow-400' },
                { title: 'Quiz Champion', description: 'Scored 90%+ on 10 quizzes', icon: <Brain className="w-6 h-6" />, color: 'text-purple-400' },
                { title: 'Learning Streak', description: '7 days of continuous learning', icon: <Zap className="w-6 h-6" />, color: 'text-orange-400' },
                { title: 'Knowledge Builder', description: 'Created 3 courses this week', icon: <BookOpen className="w-6 h-6" />, color: 'text-blue-400' }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className={`${achievement.color}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-300">{achievement.description}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {index === 0 ? 'Today' : `${index + 1} days ago`}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Learning Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Weekly Goal', current: 12, target: 15, unit: 'hours' },
              { title: 'Monthly Courses', current: 3, target: 5, unit: 'courses' },
              { title: 'Quiz Accuracy', current: 87, target: 90, unit: '%' }
            ].map((goal, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">{goal.title}</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-white">{goal.current}</span>
                  <span className="text-sm text-gray-300">/ {goal.target} {goal.unit}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;