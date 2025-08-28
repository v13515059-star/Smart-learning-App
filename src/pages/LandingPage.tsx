import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Video, FileText, Zap, Users, Star, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "YouTube Integration",
      description: "Paste any YouTube video URL and instantly transform it into structured learning content"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "PDF Processing",
      description: "Upload PDFs and extract key concepts, summaries, and interactive learning materials"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Generated Quizzes",
      description: "Automatically create comprehensive quizzes to test understanding and retention"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Smart Flashcards",
      description: "Generate intelligent flashcards for effective spaced repetition learning"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold text-white">CourseForge</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <Link to="/signin" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
            <Link to="/signup" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transform Any Content Into
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"> Complete Courses</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              Paste a YouTube video or upload a PDF, and watch AI create comprehensive lecture notes, interactive quizzes, and smart flashcards in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/signup" className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2">
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="text-white border border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to transform any learning material into an engaging, comprehensive course
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="text-emerald-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three simple steps to create your complete micro-course
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Upload Content",
                description: "Paste a YouTube URL or upload your PDF document",
                icon: <FileText className="w-12 h-12" />
              },
              {
                step: "02",
                title: "AI Processing",
                description: "Our advanced AI analyzes and extracts key learning points",
                icon: <Brain className="w-12 h-12" />
              },
              {
                step: "03",
                title: "Learn & Practice",
                description: "Access your complete course with notes, quizzes, and flashcards",
                icon: <BookOpen className="w-12 h-12" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-emerald-400/20 mb-4">{item.step}</div>
                <div className="text-emerald-400 mb-6 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 text-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to revolutionize your learning?
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of learners who are already using CourseForge to master new skills faster than ever.
            </p>
            <Link to="/signup" className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all transform hover:scale-105">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;