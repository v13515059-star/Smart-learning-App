import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot } from 'lucide-react';
import TutorChat from './TutorChat';

interface TutorButtonProps {
  courseTitle?: string;
}

const TutorButton: React.FC<TutorButtonProps> = ({ courseTitle }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:from-emerald-600 hover:to-blue-700 transition-all z-40 group"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask AI Tutor
        </div>
      </motion.button>

      <TutorChat 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        courseTitle={courseTitle}
      />
    </>
  );
};

export default TutorButton;