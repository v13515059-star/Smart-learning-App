import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, BookOpen, Brain, GraduationCap } from 'lucide-react';
import { apiService } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';
import QuizModal from '../components/QuizModal';
import FlashcardDeck from '../components/FlashcardDeck';
import ChatBot from '../components/ChatBot';

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string;
  lessons: number;
  progress: number;
  type: 'youtube' | 'pdf';
  notes: Array<{
    title: string;
    content: string;
    duration: string;
  }>;
  quizzes: Array<{
    title: string;
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  }>;
  flashcards: Array<{
    question: string;
    answer: string;
    category: string;
  }>;
  createdAt: string;
}

export default function CourseView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('video');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      
      try {
        const data = await apiService.getCourse(id);
        setCourse(data.course);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Set default active tab based on course type
  useEffect(() => {
    if (course?.type === 'pdf' && activeTab === 'video') {
      setActiveTab('notes');
    }
  }, [course, activeTab]);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: Brain },
    { id: 'flashcards', label: 'Flashcards', icon: GraduationCap },
  ];

  // Filter tabs based on course type
  const availableTabs = course?.type === 'pdf' 
    ? tabs.filter(tab => tab.id !== 'video')
    : tabs;


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-sm text-gray-600">{course.lessons} lessons • {course.duration}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                {availableTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'video' && course?.type === 'youtube' && (
                  <VideoPlayer videoUrl={course.videoUrl} />
                )}

                {activeTab === 'notes' && (
                  <div className="prose max-w-none">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Notes</h3>
                      <p className="text-gray-600">Comprehensive notes generated from your content</p>
                    </div>
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {course.notes[0]?.content || 'No notes available'}
                    </div>
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div className="text-center py-12">
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-8 mb-6">
                      <Brain className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Test Your Knowledge</h3>
                      <p className="text-gray-600 mb-6">
                        Challenge yourself with {course.quizzes?.[0]?.questions?.length || 0} questions based on the course content
                      </p>
                      <button
                        onClick={() => setIsQuizOpen(true)}
                        className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'flashcards' && (
                  <FlashcardDeck flashcards={course.flashcards} />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-gray-900 mb-2">Course Overview</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lessons:</span>
                  <span className="font-medium">{course.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="font-medium">{course.quizzes?.[0]?.questions?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Flashcards:</span>
                  <span className="font-medium">{course.flashcards.length}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Created on {new Date(course.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {isQuizOpen && course?.quizzes?.[0] && (
        <QuizModal
          isOpen={isQuizOpen}
          quiz={course.quizzes[0]}
          onClose={() => setIsQuizOpen(false)}
          onComplete={() => setIsQuizOpen(false)}
        />
      )}

      {/* AI Tutor Chatbot */}
      <ChatBot 
        courseContext={{
          title: course.title,
          currentLesson: tabs.find(tab => tab.id === activeTab)?.label,
          progress: 75
        }}
      />
    </div>
  );
}