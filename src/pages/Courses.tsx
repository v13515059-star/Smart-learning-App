import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Clock, 
  Filter,
  Grid,
  List,
  Search,
  SortAsc,
  SortDesc,
  Calendar,
  TrendingUp,
  Play,
  MoreVertical,
  Edit,
  Trash2,
  Share
} from 'lucide-react';
import ChatBot from '../components/ChatBot';

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'title'>('recent');
  const [filterBy, setFilterBy] = useState<'all' | 'youtube' | 'pdf' | 'completed' | 'in-progress'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch courses when component mounts
  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiService.getCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  // Filter and sort courses
  const filteredAndSortedCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = 
        filterBy === 'all' ||
        filterBy === course.type ||
        (filterBy === 'completed' && course.progress === 100) ||
        (filterBy === 'in-progress' && course.progress < 100);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'recent':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        case 'progress':
          comparison = b.progress - a.progress;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - new Date(timestamp).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400"></div>
      </div>
    );
  }
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
          <h1 className="text-4xl font-bold text-white mb-2">My Courses</h1>
          <p className="text-xl text-gray-300">Manage and organize your learning materials</p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Filter */}
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Courses</option>
                <option value="youtube">YouTube</option>
                <option value="pdf">PDF</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="recent">Recent</option>
                <option value="progress">Progress</option>
                <option value="title">Title</option>
              </select>

              {/* Sort Order */}
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
              </button>

              {/* View Mode */}
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
        </motion.div>

        {/* Course Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white">{courses.length}</div>
            <div className="text-sm text-gray-300">Total Courses</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-emerald-400">
              {courses.filter(c => c.progress === 100).length}
            </div>
            <div className="text-sm text-gray-300">Completed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-blue-400">
              {courses.filter(c => c.progress > 0 && c.progress < 100).length}
            </div>
            <div className="text-sm text-gray-300">In Progress</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-purple-400">
              {courses.length > 0 ? Math.round(courses.reduce((total, course) => total + course.progress, 0) / courses.length) : 0}%
            </div>
            <div className="text-sm text-gray-300">Avg Progress</div>
          </div>
        </motion.div>

        {/* Courses Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all">
                    <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link
                          to={`/course/${course._id}`}
                          className="bg-white/20 backdrop-blur-lg rounded-full p-4 hover:bg-white/30 transition-all"
                        >
                          <Play className="w-8 h-8 text-white" />
                        </Link>
                      </div>
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
                        <button className="bg-black/50 rounded-lg p-2 text-white hover:bg-black/70 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                        <span>{course.lessons} lessons</span>
                        <span>{course.duration}</span>
                        <span>{getTimeAgo(course.createdAt)}</span>
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

                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/course/${course._id}`}
                          className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors text-center font-medium"
                        >
                          Continue
                        </Link>
                        <button className="p-2 bg-white/10 text-gray-300 rounded-lg hover:text-white hover:bg-white/20 transition-colors">
                          <Share className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-center space-x-6">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center space-x-1 bg-black/30 rounded-lg px-2 py-1">
                          {course.type === 'youtube' ? (
                            <Video className="w-4 h-4 text-red-400" />
                          ) : (
                            <FileText className="w-4 h-4 text-blue-400" />
                          )}
                          <span className="text-xs text-white uppercase">{course.type}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{course.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-300">
                          <span className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.lessons} lessons</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{getTimeAgo(course.createdAt)}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-300">Progress</div>
                            <div className="text-lg font-semibold text-white">{course.progress}%</div>
                          </div>
                          <div className="w-16 h-16 relative">
                            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#374151"
                                strokeWidth="2"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="2"
                                strokeDasharray={`${course.progress}, 100`}
                              />
                            </svg>
                          </div>
                          <Link
                            to={`/course/${course._id}`}
                            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
                          >
                            Continue
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredAndSortedCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery ? 'Try adjusting your search or filters' : 'Create your first course to get started'}
              </p>
              <Link
                to="/create-course"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all"
              >
                <span>Create Course</span>
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* AI Tutor Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Courses;