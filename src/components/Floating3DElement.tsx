import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Floating3DElementProps {
  icon: React.ReactNode;
  delay?: number;
  duration?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Floating3DElement = ({ 
  icon, 
  delay = 0, 
  duration = 20,
  size = 'md' 
}: Floating3DElementProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: Math.random() * 100,
      y: Math.random() * 100
    });
  }, []);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} glass-card flex items-center justify-center text-primary`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        rotateY: [0, 180, 360],
        rotateX: [0, 15, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {icon}
    </motion.div>
  );
};

export default Floating3DElement;
