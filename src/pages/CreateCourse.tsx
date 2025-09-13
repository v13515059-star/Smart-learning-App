import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';
import ChatBot from '../components/ChatBot';
import { 
  Zap, 
  ArrowLeft, 
  Video, 
  FileText, 
  Upload, 
  Link as LinkIcon,
  Sparkles,
  CheckCircle
} from 'lucide-react';

const CreateCourse = () => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'pdf'>('youtube');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [courseGenerated, setCourseGenerated] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const generateCourse = async () => {
    setProcessing(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      let courseData;
      if (activeTab === 'youtube' && youtubeUrl.trim()) {
        courseData = await apiService.createYoutubeCourse(youtubeUrl);
      } else if (activeTab === 'pdf' && selectedFile) {
        courseData = await apiService.createPdfCourse(selectedFile);
      } else {
        throw new Error('Please provide valid input');
      }
      
      setProcessing(false);
      setCourseGenerated(true);
      
      // Redirect to course view after a short delay
      setTimeout(() => {
        navigate(`/course/${courseData.course._id}`);
      }, 2000);
    } catch (error) {
      console.error('Course generation failed:', error);
      setProcessing(false);
      alert(`Failed to generate course: ${error.message}`);
    }
  };

  const processingSteps = [
    'Analyzing content structure...',
    'Extracting key concepts...',
    'Generating lecture notes...',
    'Creating interactive quizzes...',
    'Building smart flashcards...',
    'Finalizing course materials...'
  ];

  const [currentStep, setCurrentStep] = useState(0);

  React.useEffect(() => {
    if (processing) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % processingSteps.length);
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [processing]);

  if (courseGenerated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-emerald-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Course Generated Successfully!</h1>
            <p className="text-xl text-gray-300">Your complete micro-course is ready with notes, quizzes, and flashcards.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
            <div className="text-left space-y-2">
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <span>Lecture notes extracted and organized</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <span>12 interactive quizzes generated</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <span>45 smart flashcards created</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <span>Course structure optimized for learning</span>
              </div>
            </div>
          </div>

          <p className="text-gray-400">Redirecting to your course...</p>
        </motion.div>
      </div>
    );
  }

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-md w-full"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="mb-8">
              <Sparkles className="w-16 h-16 text-emerald-400 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl font-bold text-white mb-4">AI is Creating Your Course</h2>
              <p className="text-gray-300">This may take a few moments...</p>
            </div>
            
            <div className="space-y-4">
              {processingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 transition-all duration-300 ${
                    index <= currentStep ? 'text-emerald-400' : 'text-gray-500'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : index === currentStep ? (
                    <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
                  )}
                  <span className="text-left">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / processingSteps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {Math.round(((currentStep + 1) / processingSteps.length) * 100)}% Complete
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

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
                <span className="text-2xl font-bold text-white">MindSphere AI</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Create New Course</h1>
          <p className="text-xl text-gray-300">Upload your content and let AI transform it into a complete learning experience</p>
        </motion.div>

        {/* Content Type Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="flex bg-black/20 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('youtube')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === 'youtube' 
                    ? 'bg-emerald-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Video className="w-5 h-5" />
                <span>YouTube Video</span>
              </button>
              <button
                onClick={() => setActiveTab('pdf')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === 'pdf' 
                    ? 'bg-emerald-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>PDF Document</span>
              </button>
            </div>
          </div>

          {activeTab === 'youtube' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Video className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">YouTube Video URL</h3>
                <p className="text-gray-300">Paste the URL of any YouTube video to generate a complete course</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    YouTube URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">What we'll create:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Structured lecture notes with key takeaways</li>
                    <li>• Interactive quizzes based on video content</li>
                    <li>• Smart flashcards for important concepts</li>
                    <li>• Learning progress tracking</li>
                  </ul>
                </div>

                <button
                  onClick={generateCourse}
                  disabled={!youtubeUrl.trim()}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Course with AI</span>
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'pdf' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center">
                <FileText className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">PDF Document</h3>
                <p className="text-gray-300">Upload a PDF and we'll extract the content to create your course</p>
              </div>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                  dragActive || selectedFile
                    ? 'border-emerald-400 bg-emerald-500/10'
                    : 'border-white/30 hover:border-white/50'
                }`}
              >
                {selectedFile ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">File Selected</h4>
                      <p className="text-gray-300">{selectedFile.name}</p>
                      <p className="text-sm text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Choose different file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Drop your PDF here</h4>
                      <p className="text-gray-300 mb-4">or click to browse files</p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="pdf-upload"
                      />
                      <label
                        htmlFor="pdf-upload"
                        className="inline-block bg-white/10 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                      >
                        Browse Files
                      </label>
                    </div>
                    <p className="text-sm text-gray-400">Maximum file size: 10MB</p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-400 font-medium mb-2">What we'll create:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Comprehensive summaries of each section</li>
                    <li>• Key concept extractions and definitions</li>
                    <li>• Practice questions based on content</li>
                    <li>• Interactive flashcards for memorization</li>
                  </ul>
                </div>
              )}

              <button
                onClick={generateCourse}
                disabled={!selectedFile}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate Course with AI</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* AI Tutor Chatbot */}
      <ChatBot />
    </div>
  );
};

export default CreateCourse;