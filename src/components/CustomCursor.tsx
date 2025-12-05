import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      trailIdRef.current += 1;
      setTrail(prev => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: trailIdRef.current }
      ]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [data-hoverable]')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail(prev => prev.slice(-12));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {/* Trail points */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9996]"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
            x: point.x - 4,
            y: point.y - 4,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <div 
            className="w-2 h-2 bg-foreground"
            style={{ 
              clipPath: index % 2 === 0 
                ? 'polygon(50% 0%, 100% 100%, 0% 100%)' 
                : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            }}
          />
        </motion.div>
      ))}

      {/* Main cursor - geometric shape */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isClicking ? 0.7 : isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div 
          className="w-6 h-6 bg-foreground transition-all duration-200"
          style={{ 
            clipPath: isHovering 
              ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' 
              : 'polygon(50% 0%, 100% 100%, 0% 100%)'
          }}
        />
      </motion.div>

      {/* Outer ring - geometric */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? -45 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      >
        <div 
          className="w-12 h-12 border border-foreground/50 transition-all duration-300"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        />
      </motion.div>

      {/* Crosshair lines */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y - 30,
          opacity: isHovering ? 1 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="w-[1px] h-6 bg-foreground/50" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y + 6,
          opacity: isHovering ? 1 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="w-[1px] h-6 bg-foreground/50" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 30,
          y: mousePosition.y,
          opacity: isHovering ? 1 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="w-6 h-[1px] bg-foreground/50" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x + 6,
          y: mousePosition.y,
          opacity: isHovering ? 1 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="w-6 h-[1px] bg-foreground/50" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
