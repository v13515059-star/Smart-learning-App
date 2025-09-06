import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  RotateCcw,
  Lightbulb,
  BookOpen,
  Brain
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'quiz' | 'explanation';
}

interface ChatBotProps {
  courseContext?: {
    title: string;
    currentLesson?: string;
    progress?: number;
  };
}

const ChatBot: React.FC<ChatBotProps> = ({ courseContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: courseContext 
        ? `Hi! I'm your AI tutor for "${courseContext.title}". I'm here to help you understand the concepts, answer questions, and guide your learning. What would you like to know?`
        : "Hi! I'm your MindSphere AI learning assistant. I can help you understand concepts, create study materials, answer questions, and guide your learning journey. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Context-aware responses
    if (courseContext) {
      if (lowerMessage.includes('explain') || lowerMessage.includes('what is')) {
        return `Great question! Let me break this down for you in the context of "${courseContext.title}". This concept is fundamental to understanding the material. Would you like me to provide a detailed explanation with examples, or would you prefer a quick summary?`;
      }
      
      if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
        return `I can help you test your knowledge! Based on your current progress in "${courseContext.title}", I can create practice questions. Would you like me to generate a quick quiz on the current lesson, or focus on specific topics you're struggling with?`;
      }
      
      if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
        return `I'm here to help! It's completely normal to feel stuck sometimes. Let's work through this together. Can you tell me specifically which part of "${courseContext.currentLesson || 'the current lesson'}" is challenging you?`;
      }
    }

    // General learning responses
    if (lowerMessage.includes('study tips') || lowerMessage.includes('how to learn')) {
      return `Here are some effective study strategies I recommend: 1) Use active recall - test yourself frequently, 2) Practice spaced repetition with flashcards, 3) Teach concepts to others or explain them out loud, 4) Take regular breaks using the Pomodoro technique. Which of these would you like me to elaborate on?`;
    }
    
    if (lowerMessage.includes('flashcard') || lowerMessage.includes('memorize')) {
      return `Flashcards are excellent for memorization! I can help you create effective flashcards. The key is to: make them concise, use your own words, include visual cues when possible, and review them regularly. Would you like me to generate some flashcards for specific topics?`;
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('discouraged')) {
      return `Learning can be challenging, but you're doing great by seeking help! Remember that every expert was once a beginner. Break down complex topics into smaller, manageable pieces, celebrate small wins, and don't hesitate to ask questions. What specific area would you like to focus on to build your confidence?`;
    }

    // Default responses
    const responses = [
      "That's an interesting question! Let me help you understand this concept better. Can you provide more context about what specifically you'd like to learn?",
      "I'd be happy to help you with that! Learning is most effective when we break things down step by step. What aspect would you like to explore first?",
      "Great question! This is exactly the kind of thinking that leads to deep understanding. Let me guide you through this concept.",
      "I can definitely help you with that topic! Understanding the fundamentals is key to mastering any subject. What's your current level of familiarity with this area?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      content: courseContext 
        ? `Hi! I'm your AI tutor for "${courseContext.title}". I'm here to help you understand the concepts, answer questions, and guide your learning. What would you like to know?`
        : "Hi! I'm your MindSphere AI learning assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }]);
  };

  const quickActions = [
    { label: 'Explain this concept', icon: <Lightbulb className="w-4 h-4" /> },
    { label: 'Create a quiz', icon: <Brain className="w-4 h-4" /> },
    { label: 'Study tips', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'I need help', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:from-emerald-600 hover:to-blue-700 transition-all transform hover:scale-110 z-50"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Tutor</h3>
                  {courseContext && !isMinimized && (
                    <p className="text-xs text-gray-300">{courseContext.title}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={clearChat}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                            : 'bg-gradient-to-r from-emerald-400 to-blue-500'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        
                        <div className={`rounded-2xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white/10 rounded-2xl p-3 border border-white/20">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2">
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputMessage(action.label);
                            setTimeout(() => handleSendMessage(), 100);
                          }}
                          className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm"
                        >
                          {action.icon}
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your learning..."
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-3 rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;