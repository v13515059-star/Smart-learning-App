import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  BookOpen,
  Brain,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  Video,
  FileText,
  Clock,
  Award,
  Download,
  Share2,
  Star
} from 'lucide-react';
import { apiService } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';
import QuizModal from '../components/QuizModal';
import FlashcardDeck from '../components/FlashcardDeck';
import ChatBot from '../components/ChatBot';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  completed: boolean;
  content?: string;
  videoUrl?: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
  expanded: boolean;
}

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
  const [sections, setSections] = useState<Section[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        const data = await apiService.getCourse(id);
        setCourse(data);

        const generatedSections = generateCourseSections(data);
        setSections(generatedSections);

        const firstLesson = generatedSections[0]?.lessons[0];
        if (firstLesson) {
          setCurrentLesson(firstLesson);
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const generateCourseSections = (courseData: Course): Section[] => {
    const sectionsData: Section[] = [];

    if (courseData.type === 'youtube' && courseData.videoUrl) {
      sectionsData.push({
        id: 'section-1',
        title: 'Introduction',
        expanded: true,
        lessons: [
          {
            id: 'lesson-1',
            title: 'Course Overview',
            type: 'video',
            duration: '5 min',
            completed: false,
            videoUrl: courseData.videoUrl
          }
        ]
      });
    }

    if (courseData.notes && courseData.notes.length > 0) {
      sectionsData.push({
        id: 'section-2',
        title: 'Course Materials',
        expanded: true,
        lessons: courseData.notes.map((note, idx) => ({
          id: `lesson-note-${idx}`,
          title: note.title,
          type: 'reading' as const,
          duration: note.duration,
          completed: false,
          content: note.content
        }))
      });
    }

    if (courseData.quizzes && courseData.quizzes.length > 0) {
      sectionsData.push({
        id: 'section-3',
        title: 'Knowledge Checks',
        expanded: true,
        lessons: courseData.quizzes.map((quiz, idx) => ({
          id: `lesson-quiz-${idx}`,
          title: quiz.title,
          type: 'quiz' as const,
          duration: `${quiz.questions.length * 2} min`,
          completed: false
        }))
      });
    }

    return sectionsData;
  };

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, expanded: !section.expanded }
        : section
    ));
  };

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  const markLessonComplete = () => {
    if (!currentLesson) return;

    setSections(sections.map(section => ({
      ...section,
      lessons: section.lessons.map(lesson =>
        lesson.id === currentLesson.id
          ? { ...lesson, completed: true }
          : lesson
      )
    })));

    const allLessons = sections.flatMap(s => s.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1) {
      setCurrentLesson(allLessons[currentIndex + 1]);
    }
  };

  const calculateProgress = () => {
    const allLessons = sections.flatMap(s => s.lessons);
    const completedLessons = allLessons.filter(l => l.completed).length;
    return allLessons.length > 0
      ? Math.round((completedLessons / allLessons.length) * 100)
      : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white">{course.title}</h1>
                <p className="text-sm text-gray-400">{progress}% Complete</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Star className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto ${sidebarCollapsed ? 'w-full' : ''}`}>
          <div className="max-w-5xl mx-auto p-6">
            {/* Current Lesson Content */}
            {currentLesson && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden mb-6">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-white">{currentLesson.title}</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{currentLesson.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {currentLesson.type === 'video' && currentLesson.videoUrl && (
                    <div className="mb-6">
                      <VideoPlayer videoUrl={currentLesson.videoUrl} />
                    </div>
                  )}

                  {currentLesson.type === 'reading' && currentLesson.content && (
                    <div className="prose prose-invert max-w-none">
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 mb-6 border border-blue-500/20">
                        <BookOpen className="w-8 h-8 text-blue-400 mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">Lesson Content</h3>
                        <p className="text-gray-400">Read through the materials below</p>
                      </div>
                      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {currentLesson.content}
                      </div>
                    </div>
                  )}

                  {currentLesson.type === 'quiz' && (
                    <div className="text-center py-12">
                      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg p-8 mb-6 border border-emerald-500/20">
                        <Brain className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Knowledge Check</h3>
                        <p className="text-gray-400 mb-6">
                          Test your understanding with this quiz
                        </p>
                        <button
                          onClick={() => setIsQuizOpen(true)}
                          className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <button
                      onClick={markLessonComplete}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Mark as Complete</span>
                    </button>

                    {course.flashcards && course.flashcards.length > 0 && (
                      <button
                        onClick={() => setIsQuizOpen(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
                      >
                        <GraduationCap className="w-5 h-5" />
                        <span>Review Flashcards</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Resources */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Download className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Course Resources</h3>
                    <p className="text-sm text-gray-400">Downloadable materials</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10">
                  Download All Resources
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-emerald-500/20 rounded-lg">
                    <Award className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Certificate</h3>
                    <p className="text-sm text-gray-400">Complete to earn</p>
                  </div>
                </div>
                <div className="w-full py-2 text-center text-gray-400 rounded-lg border border-white/10">
                  {progress}% Complete
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-0' : 'w-96'} transition-all duration-300 bg-black/40 backdrop-blur-lg border-l border-white/10 overflow-hidden`}>
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Course Content</h3>
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Your Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-2">
                {sections.map((section, sectionIdx) => (
                  <div key={section.id} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {section.expanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <h4 className="font-semibold text-white text-sm">Section {sectionIdx + 1}</h4>
                          <p className="text-xs text-gray-400">{section.title}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {section.lessons.filter(l => l.completed).length}/{section.lessons.length}
                      </span>
                    </button>

                    {section.expanded && (
                      <div className="border-t border-white/10">
                        {section.lessons.map((lesson, lessonIdx) => (
                          <button
                            key={lesson.id}
                            onClick={() => selectLesson(lesson)}
                            className={`w-full flex items-center space-x-3 p-4 text-left transition-colors ${
                              currentLesson?.id === lesson.id
                                ? 'bg-emerald-500/20 border-l-2 border-emerald-500'
                                : 'hover:bg-white/5'
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {lesson.completed ? (
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-600" />
                              )}
                            </div>

                            <div className="flex-shrink-0">
                              {lesson.type === 'video' && <Video className="w-4 h-4 text-blue-400" />}
                              {lesson.type === 'reading' && <FileText className="w-4 h-4 text-purple-400" />}
                              {lesson.type === 'quiz' && <Brain className="w-4 h-4 text-emerald-400" />}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                currentLesson?.id === lesson.id ? 'text-white' : 'text-gray-300'
                              }`}>
                                {lessonIdx + 1}. {lesson.title}
                              </p>
                              <p className="text-xs text-gray-500">{lesson.duration}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed Sidebar Toggle */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="fixed right-4 top-20 p-3 bg-emerald-500 text-white rounded-lg shadow-lg hover:bg-emerald-600 transition-all z-50"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
        )}
      </div>

      {/* Quiz Modal */}
      {isQuizOpen && course?.quizzes?.[0] && (
        <QuizModal
          isOpen={isQuizOpen}
          quiz={course.quizzes[0]}
          onClose={() => setIsQuizOpen(false)}
          onComplete={() => {
            setIsQuizOpen(false);
            markLessonComplete();
          }}
        />
      )}

      {/* AI Tutor Chatbot */}
      <ChatBot
        courseContext={{
          title: course.title,
          currentLesson: currentLesson?.title || '',
          progress: progress
        }}
      />
    </div>
  );
}
