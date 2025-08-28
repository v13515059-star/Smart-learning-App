import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: {
    id: number;
    title: string;
    questions: Question[];
  };
  onComplete: (score: number) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate score and show results
      const correctAnswers = quiz.questions.filter(
        (q, index) => selectedAnswers[q.id] === q.correctAnswer
      ).length;
      const score = Math.round((correctAnswers / quiz.questions.length) * 100);
      setShowResults(true);
      setQuizCompleted(true);
      onComplete(score);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const currentQ = quiz.questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQ?.id] !== undefined;
  const correctAnswers = quiz.questions.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswer
  ).length;
  const score = Math.round((correctAnswers / quiz.questions.length) * 100);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-white/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div>
              <h2 className="text-2xl font-bold text-white">{quiz.title}</h2>
              {!showResults && (
                <p className="text-gray-300">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {showResults ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <div className="mb-8">
                  <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h3>
                  <p className="text-xl text-gray-300">Your Score: {score}%</p>
                </div>

                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{correctAnswers}</div>
                      <div className="text-sm text-gray-300">Correct</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-400">
                        {quiz.questions.length - correctAnswers}
                      </div>
                      <div className="text-sm text-gray-300">Incorrect</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{quiz.questions.length}</div>
                      <div className="text-sm text-gray-300">Total</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {quiz.questions.map((question, index) => {
                    const userAnswer = selectedAnswers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <div key={question.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-start space-x-3">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-white font-medium mb-2">{question.question}</p>
                            <p className="text-sm text-gray-300">
                              Your answer: {question.options[userAnswer]}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-emerald-400">
                                Correct answer: {question.options[question.correctAnswer]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="flex-1 bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-all"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-700 transition-all"
                  >
                    Continue Learning
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">{currentQ.question}</h3>
                  
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(currentQ.id, index)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          selectedAnswers[currentQ.id] === index
                            ? 'bg-emerald-500/20 border-emerald-500 text-white'
                            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQ.id] === index
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-gray-400'
                          }`}>
                            {selectedAnswers[currentQ.id] === index && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuizModal;