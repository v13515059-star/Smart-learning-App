import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuizModal from '../components/QuizModal';
import VideoPlayer from '../components/VideoPlayer';
import FlashcardDeck from '../components/FlashcardDeck';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  FileText, 
  CheckCircle,
  Clock,
  Award,
  Zap
} from 'lucide-react';

const CourseView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'notes' | 'quizzes' | 'flashcards'>('notes');
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [quizScores, setQuizScores] = useState<{ [key: number]: number }>({});

  // Mock course data
  const course = {
    title: 'Introduction to Machine Learning',
    description: 'A comprehensive guide to understanding machine learning concepts, algorithms, and practical applications.',
    thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
    duration: '2h 30m',
    lessons: 12,
    progress: 75,
    type: 'youtube'
  };

  const notes = [
    {
      id: 1,
      title: 'What is Machine Learning?',
      content: `Machine Learning is a subset of artificial intelligence (AI) that focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy.

## Key Concepts

### Definition
Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention.

### Types of Machine Learning
1. **Supervised Learning**: Uses labeled training data
2. **Unsupervised Learning**: Finds hidden patterns in data
3. **Reinforcement Learning**: Learns through interaction with environment

### Applications
- Image recognition
- Natural language processing
- Recommendation systems
- Autonomous vehicles`,
      duration: '15 min read'
    },
    {
      id: 2,
      title: 'Supervised vs Unsupervised Learning',
      content: `Understanding the fundamental difference between supervised and unsupervised learning approaches.

## Supervised Learning

Supervised learning uses labeled training data to learn a mapping function from inputs to outputs. The algorithm learns from training data and makes predictions on new, unseen data.

### Examples:
- Classification: Email spam detection
- Regression: House price prediction

## Unsupervised Learning

Unsupervised learning finds hidden patterns or structures in data without labeled examples. The algorithm must find patterns on its own.

### Examples:
- Clustering: Customer segmentation
- Association: Market basket analysis`,
      duration: '12 min read'
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Machine Learning Basics',
      questions: [
        {
          id: 1,
          question: 'What is the main goal of supervised learning?',
          options: [
            'To find hidden patterns in data',
            'To learn from labeled training data',
            'To maximize rewards through trial and error',
            'To reduce the dimensionality of data'
          ],
          correctAnswer: 1,
          explanation: 'Supervised learning uses labeled training data to learn a mapping function from inputs to outputs.'
        },
        {
          id: 2,
          question: 'Which of the following is an example of unsupervised learning?',
          options: [
            'Email spam detection',
            'House price prediction',
            'Customer segmentation',
            'Image classification'
          ],
          correctAnswer: 2,
          explanation: 'Customer segmentation is clustering, which is an unsupervised learning technique that finds hidden patterns in data.'
        },
        {
          id: 3,
          question: 'What is overfitting in machine learning?',
          options: [
            'When a model is too simple',
            'When a model performs well on training data but poorly on new data',
            'When a model has too few parameters',
            'When a model trains too quickly'
          ],
          correctAnswer: 1,
          explanation: 'Overfitting occurs when a model learns the training data too well and fails to generalize to new, unseen data.'
        }
      ]
    },
    {
      id: 2,
      title: 'Supervised Learning Concepts',
      questions: [
        {
          id: 4,
          question: 'What is the difference between classification and regression?',
          options: [
            'Classification predicts continuous values, regression predicts categories',
            'Classification predicts categories, regression predicts continuous values',
            'There is no difference',
            'Classification is unsupervised, regression is supervised'
          ],
          correctAnswer: 1,
          explanation: 'Classification predicts discrete categories or classes, while regression predicts continuous numerical values.'
        },
        {
          id: 5,
          question: 'Which algorithm is commonly used for classification?',
          options: [
            'Linear Regression',
            'K-means',
            'Decision Tree',
            'PCA'
          ],
          correctAnswer: 2,
          explanation: 'Decision Trees are commonly used for classification tasks as they can split data into different classes.'
        }
      ]
    },
    {
      id: 3,
      title: 'Algorithms and Applications',
      questions: [
        {
          id: 6,
          question: 'What is cross-validation used for?',
          options: [
            'To increase training speed',
            'To evaluate model performance and prevent overfitting',
            'To reduce the size of the dataset',
            'To visualize data'
          ],
          correctAnswer: 1,
          explanation: 'Cross-validation is used to evaluate how well a model will generalize to new data and helps prevent overfitting.'
        }
      ]
    }
  ];

  const flashcards = [
    {
      id: 1,
      question: 'What is the main goal of supervised learning?',
      answer: 'To learn a mapping function from input variables to output variables using labeled training data.',
      category: 'Fundamentals'
    },
    {
      id: 2,
      question: 'Name three types of machine learning.',
      answer: 'Supervised learning, Unsupervised learning, and Reinforcement learning.',
      category: 'Types'
    },
    {
      id: 3,
      question: 'What is overfitting?',
      answer: 'When a model learns the training data too well and fails to generalize to new, unseen data.',
      category: 'Problems'
    }
  ];

  const handleQuizStart = (quiz: any) => {
    setSelectedQuiz(quiz);
  };

  const handleQuizComplete = (quizId: number, score: number) => {
    setQuizScores(prev => ({
      ...prev,
      [quizId]: score
    }));
  };
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-2">
                <Zap className="w-8 h-8 text-emerald-400" />
                <span className="text-2xl font-bold text-white">CourseForge</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
            <div className="flex-1 mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>{course.progress}% complete</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-80">
              <VideoPlayer 
                videoUrl={course.videoUrl}
                thumbnail={course.thumbnail}
                title={course.title}
              />
            </div>
          </div>
        </motion.div>

        {/* Course Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-white/20">
            {[
              { key: 'notes', label: 'Lecture Notes', icon: FileText },
              { key: 'quizzes', label: 'Quizzes', icon: Brain },
              { key: 'flashcards', label: 'Flashcards', icon: BookOpen }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 transition-all ${
                  activeTab === key
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'notes' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Lecture Notes</h2>
                  <p className="text-gray-300">Comprehensive notes extracted and organized by AI</p>
                </div>
                
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-white/5 rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-white">{note.title}</h3>
                      <span className="text-sm text-gray-400">{note.duration}</span>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                        {note.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'quizzes' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Interactive Quizzes</h2>
                  <p className="text-gray-300">Test your understanding with AI-generated questions</p>
                </div>
                
                {quizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{quiz.title}</h3>
                        <p className="text-gray-300 mb-4">{quiz.questions.length} questions</p>
                        
                        {quizScores[quiz.id] ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-400">Completed - Score: {quizScores[quiz.id]}%</span>
                          </div>
                        ) : (
                          <span className="text-yellow-400">Not started</span>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => handleQuizStart(quiz)}
                        className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-700 transition-all"
                      >
                        {quizScores[quiz.id] ? 'Retake Quiz' : 'Start Quiz'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'flashcards' && (

              <FlashcardDeck flashcards={flashcards} />
            )}
          </div>
        </motion.div>

        {/* Quiz Modal */}
        {selectedQuiz && (
          <QuizModal
            isOpen={!!selectedQuiz}
            onClose={() => setSelectedQuiz(null)}
            quiz={selectedQuiz}
            onComplete={(score) => {
              handleQuizComplete(selectedQuiz.id, score);
              setSelectedQuiz(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CourseView;