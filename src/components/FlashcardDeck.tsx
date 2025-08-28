import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FlashcardDeckProps {
  flashcards: Flashcard[];
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ flashcards }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState(false);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const resetDeck = () => {
    setCurrentCard(0);
    setIsFlipped(false);
  };

  if (!studyMode) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Smart Flashcards</h2>
          <p className="text-gray-300">Master key concepts with spaced repetition</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="mb-4">
                <span className="text-xs text-emerald-400 font-medium uppercase tracking-wide">
                  {card.category}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Question</h4>
                  <p className="text-white font-medium">{card.question}</p>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <h4 className="text-sm text-gray-400 mb-2">Answer</h4>
                  <p className="text-gray-300">{card.answer}</p>
                </div>
              </div>
              
              <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-400">Hover to reveal answer</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setStudyMode(true)}
            className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all"
          >
            Start Flashcard Review
          </button>
        </div>
      </div>
    );
  }

  const card = flashcards[currentCard];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Flashcard Review</h2>
        <p className="text-gray-300">
          Card {currentCard + 1} of {flashcards.length}
        </p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative h-80 perspective-1000">
        <motion.div
          className="relative w-full h-full cursor-pointer"
          onClick={flipCard}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-white/20 backface-hidden">
            <div className="mb-4">
              <span className="text-xs text-blue-200 font-medium uppercase tracking-wide">
                {card.category}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">{card.question}</h3>
            <div className="flex items-center space-x-2 text-blue-200">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Click to reveal answer</span>
            </div>
          </div>

          {/* Back of card */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-white/20"
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            <div className="mb-4">
              <span className="text-xs text-emerald-200 font-medium uppercase tracking-wide">
                Answer
              </span>
            </div>
            <p className="text-xl text-white leading-relaxed mb-6">{card.answer}</p>
            <div className="flex items-center space-x-2 text-emerald-200">
              <EyeOff className="w-4 h-4" />
              <span className="text-sm">Click to flip back</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevCard}
          disabled={currentCard === 0}
          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4">
          <button
            onClick={resetDeck}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setStudyMode(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Exit Review
          </button>
        </div>

        <button
          onClick={nextCard}
          disabled={currentCard === flashcards.length - 1}
          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Study Progress */}
      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>Study Progress</span>
          <span>{Math.round(((currentCard + 1) / flashcards.length) * 100)}% Complete</span>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default FlashcardDeck;