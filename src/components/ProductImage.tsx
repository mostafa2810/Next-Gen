import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from '../types';

interface ProductImageProps {
  phone: Phone;
  currentColor: string;
}

export default function ProductImage({ phone, currentColor }: ProductImageProps) {
  const selectedColor = phone.colors.find(c => c.value === currentColor);
  const imagePath = selectedColor ? selectedColor.imagePath : '';
  const glowColor = selectedColor ? selectedColor.hex : '#ffffff';

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Amorphous Colored Glow */}
      <AnimatePresence>
        <motion.div
          key={glowColor}
          className="absolute w-full h-full rounded-full blur-[100px]"
          style={{ backgroundColor: glowColor }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1.1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </AnimatePresence>
      
      {/* Phone Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imagePath}
          className="relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={imagePath} 
            alt={`${phone.fullName} in ${selectedColor?.name}`} 
            className="max-h-full max-w-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 