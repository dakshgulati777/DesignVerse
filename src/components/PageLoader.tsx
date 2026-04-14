import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onComplete: () => void;
}

const PageLoader = ({ onComplete }: PageLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + 4;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-16 h-16 bg-foreground flex items-center justify-center"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <span className="text-lg font-black text-background">DV</span>
        </motion.div>
        <motion.div className="mt-6 w-32 h-[2px] bg-foreground/20 overflow-hidden">
          <motion.div className="h-full bg-foreground" style={{ width: `${progress}%` }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;
