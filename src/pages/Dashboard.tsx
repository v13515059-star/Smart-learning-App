import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getCourses } from '../utils/courseGenerator';
import ChatBot from '../components/ChatBot';
import { 
  Zap, 
  Plus, 
  BookOpen, 
  Video, 
  FileText, 
  Clock, 
  TrendingUp,
  LogOut,
  User,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState(getCourses());

  // Refresh courses when component mounts
  React.useEffect(() => {
    setCourses(getCourses());
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const stats = [
    {
      title: 'Courses Created',
      value: courses.length.toString(),
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Hours Learned',
      value: Math.floor(courses.reduce((total, course) => {
        const hours = parseFloat(course.duration.split('h')[0]) || 0;
        return total + (hours * course.progress / 100);
      }, 0)).toString(),
      icon: <Clock className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Completion Rate',
      value: courses.length > 0 ? 
        Math.round(courses.reduce((total, course) => total + course.progress, 0) / courses.length) + '%' : 
        '0%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold text-white">MindSphere AI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-5 h-5" />
                <span>Welcome, {user?.name || 'User'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-xl text-gray-300">Welcome back, {user?.name}! Transform your learning materials into comprehensive courses</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.title}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Create Course CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-emerald-500/20 to-blue-600/20 rounded-2xl p-8 mb-12 border border-emerald-500/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-2">Ready to create your next course?</h2>
              <p className="text-xl text-gray-300">Upload content and let AI do the magic</p>
            </div>
            <Link
              to="/create-course"
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Course</span>
            </Link>
          </div>
        </motion.div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">My Courses</h2>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Link
                  to={`/course/${course.id}`}
                  className="block bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all transform hover:scale-[1.02]"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-1 bg-black/50 rounded-lg px-2 py-1">
                        {course.type === 'youtube' ? (
                          <Video className="w-4 h-4 text-red-400" />
                        ) : (
                          <FileText className="w-4 h-4 text-blue-400" />
                        )}
                        <span className="text-xs text-white uppercase font-medium">{course.type}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        course.progress === 100
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-yellow-500 text-black'
                      }`}>
                        {course.progress === 100 ? 'Completed' : 'In Progress'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                      <span>{course.lessons} lessons</span>
                      <span>{course.duration}</span>
                      <span>{getTimeAgo(parseInt(course.id.split('-')[1]))}</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-300 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && courses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses yet</h3>
              <p className="text-gray-400 mb-6">Create your first course to get started</p>
              <Link
                to="/create-course"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Create Course</span>
              </Link>
            </div>
          )}

          {filteredCourses.length === 0 && courses.length > 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses found</h3>
              <p className="text-gray-400">Try adjusting your search query</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* AI Tutor Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Dashboard;