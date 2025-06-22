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
          
          {/* Bestseller Ribbon Badge */}
          {phone.bestseller && (
            <motion.div
              className="absolute top-[15%] right-[10%] z-20"
              initial={{ scale: 0.8, x: 50, opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            >
              <div
                className="bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-xs py-2 pl-4 pr-5 rounded-l-md shadow-lg"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 88% 50%, 100% 100%, 0% 100%)',
                }}
              >
                <div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
                  <span className="drop-shadow-sm">الأكثر مبيعاً</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 