import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Phone } from '../types';

interface NavigationProps {
  phones: Phone[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function Navigation({ phones, currentIndex, onNavigate }: NavigationProps) {
  const nextSlide = () => {
    onNavigate((currentIndex + 1) % phones.length);
  };

  const prevSlide = () => {
    onNavigate(currentIndex === 0 ? phones.length - 1 : currentIndex - 1);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <button
        onClick={prevSlide}
        className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <div className="flex space-x-2">
        {phones.map((phone, index) => (
          <button
            key={phone.id}
            onClick={() => onNavigate(index)}
            className="relative p-2"
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-400' : 'bg-white/30 hover:bg-white/50'
            }`} />
            {index === currentIndex && (
              <motion.div
                layoutId="activeSlide"
                className="absolute inset-0 w-3 h-3 rounded-full bg-blue-400 m-2"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <button
        onClick={nextSlide}
        className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}