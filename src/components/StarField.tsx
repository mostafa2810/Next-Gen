import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
}

interface Meteor {
  id: number;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
}

export default function StarField() {
  const starsRef = useRef<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    // Generate fewer stars for better performance
    const generateStars = () => {
      const stars: Star[] = [];
      const starCount = 80; // Reduced from 150

      for (let i = 0; i < starCount; i++) {
        stars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1, // Smaller stars
          opacity: Math.random() * 0.6 + 0.3,
          twinkleDelay: Math.random() * 4,
        });
      }

      starsRef.current = stars;
    };

    // Generate falling meteors
    const generateMeteors = () => {
      const meteorCount = 7; // Add 7 falling meteors
      const newMeteors = Array.from({ length: meteorCount }, (_, i) => ({
        id: i,
        startX: Math.random() * 100,
        startY: -20, // Start off-screen at the top
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 10,
      }));
      setMeteors(newMeteors);
    };

    generateStars();
    generateMeteors();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Much Darker Galaxy Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/30 via-gray-950/50 to-black" />
      
      {/* Subtle Nebula Effects - Much Darker */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-900/4 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.02, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Optimized Animated Stars */}
      {starsRef.current.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity * 0.4, star.opacity * 0.8, star.opacity * 0.4],
          }}
          transition={{
            duration: 3 + star.twinkleDelay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.twinkleDelay,
          }}
        />
      ))}

      {/* Falling Meteors */}
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)',
            left: `${meteor.startX}%`,
            top: `${meteor.startY}%`,
          }}
          animate={{
            y: window.innerHeight + 50,
            x: Math.random() * 100 - 50, // Add slight horizontal drift
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        />
      ))}
   

      {/* Minimal Distant Glow */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 bg-gradient-radial from-white/3 to-transparent rounded-full"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}