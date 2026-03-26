import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Geometric Background Pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-foreground/20"
                style={{
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Logo Container */}
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Outer Ring */}
            <motion.div
              className="absolute -inset-8 border-2 border-foreground/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner Ring */}
            <motion.div
              className="absolute -inset-4 border border-foreground/50 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Logo */}
            <motion.div
              className="w-24 h-24 bg-foreground flex items-center justify-center relative"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(255,255,255,0.1)',
                  '0 0 60px rgba(255,255,255,0.3)',
                  '0 0 20px rgba(255,255,255,0.1)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-3xl font-black text-background tracking-tight">DV</span>
            </motion.div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-foreground">
              DESIGNVERSE
            </h1>
            <p className="text-sm text-muted-foreground mt-2 tracking-widest">
              CREATIVE DESIGN PLATFORM
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="mt-12 w-48 h-[2px] bg-foreground/20 overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.div
              className="h-full bg-foreground"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Progress Text */}
          <motion.p
            className="mt-4 text-xs text-muted-foreground font-mono tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {progress}%
          </motion.p>

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-foreground/30" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-foreground/30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-foreground/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-foreground/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
