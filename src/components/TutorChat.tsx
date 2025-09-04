import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  Sparkles,
  BookOpen,
  Brain,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

interface TutorChatProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

const TutorChat: React.FC<TutorChatProps> = ({ isOpen, onClose, courseTitle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: courseTitle 
        ? `Hello! I'm your AI tutor for "${courseTitle}". I can help explain concepts, create practice questions, provide study tips, and answer any questions you have. What would you like to explore?`
        : "Hello! I'm your AI learning assistant. I can help you understand concepts, create study materials, and guide your learning. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Explain the main concepts",
        "Create practice questions", 
        "Give me study tips",
        "Help me understand this better"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('explain') || message.includes('what is')) {
      return {
        content: `I'd be happy to explain that concept! Let me break it down into digestible parts. Understanding the fundamentals is key to mastering any topic. Would you like me to start with the basic definition and then move to practical examples?`,
        suggestions: [
          "Yes, start with basics",
          "Give me examples",
          "Show me how it's used",
          "What are the key points?"
        ]
      };
    }
    
    if (message.includes('quiz') || message.includes('test') || message.includes('practice')) {
      return {
        content: `Great idea! Practice questions are excellent for reinforcing learning. I can create different types of questions - multiple choice, true/false, or open-ended. What type would be most helpful for you right now?`,
        suggestions: [
          "Multiple choice questions",
          "True/false questions", 
          "Concept explanations",
          "Real-world examples"
        ]
      };
    }
    
    if (message.includes('study') || message.includes('tips') || message.includes('learn better')) {
      return {
        content: `Here are some proven study techniques that can boost your learning: 1) Active recall - test yourself frequently, 2) Spaced repetition - review material at increasing intervals, 3) Elaborative interrogation - ask yourself "why" and "how", 4) Interleaving - mix different topics. Which technique interests you most?`,
        suggestions: [
          "Tell me about active recall",
          "How does spaced repetition work?",
          "Help me create a study schedule",
          "What's the best way to take notes?"
        ]
      };
    }
    
    if (message.includes('help') || message.includes('stuck') || message.includes('confused')) {
      return {
        content: `I understand it can be frustrating when you're stuck! Let's work through this step by step. The best approach is to identify exactly what's confusing you, then break it down into smaller, manageable pieces. What specific part is giving you trouble?`,
        suggestions: [
          "I don't understand the concept",
          "The examples are confusing",
          "I need more practice",
          "Can you simplify this?"
        ]
      };
    }
    
    if (message.includes('motivation') || message.includes('difficult') || message.includes('hard')) {
      return {
        content: `Learning challenging material is tough, but you're doing great by asking for help! Remember, every expert was once a beginner. The key is persistence and breaking things down into smaller steps. What would help you feel more confident about this topic?`,
        suggestions: [
          "Give me easier examples",
          "Show me the big picture",
          "Help me practice more",
          "What should I focus on?"
        ]
      };
    }

    // Default response
    return {
      content: `That's a great question! I'm here to help you understand this better. Could you provide a bit more context about what specifically you'd like to learn or what's challenging you?`,
      suggestions: [
        "Explain the basics",
        "Give me examples",
        "Create practice questions",
        "Help me study effectively"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl w-full max-w-4xl h-[80vh] border border-white/20 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Tutor</h2>
              {courseTitle && (
                <p className="text-sm text-gray-300">Helping you with {courseTitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                    : 'bg-gradient-to-r from-emerald-400 to-blue-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className={`rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}>
                    <p className="leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {message.suggestions && message.sender === 'ai' && (
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm hover:bg-white/20 hover:text-white transition-all border border-white/20"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-gray-300">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/20">
          <div className="flex items-center space-x-3">
            <input
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
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-3 rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorChat;