import { motion } from 'framer-motion';

interface LogoProps {
  imagePath?: string;
}

export default function Logo({ imagePath = '/images/logo.png' }: LogoProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glowing Background Effect */}
      <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl animate-pulse" />
      
      {/* White Neon Frame */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border-2 border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.5)]">
        {/* Inner Glow */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-r from-white/10 to-transparent" />
        
        {/* Logo Content */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
          <img 
            src={imagePath} 
            alt="Logo" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
} 