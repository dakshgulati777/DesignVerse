import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GeometricShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: 'square' | 'triangle' | 'hexagon' | 'diamond';
  duration: number;
}

const AnimatedBackground = () => {
  const [shapes, setShapes] = useState<GeometricShape[]>([]);

  useEffect(() => {
    const newShapes: GeometricShape[] = [];
    const types: GeometricShape['type'][] = ['square', 'triangle', 'hexagon', 'diamond'];
    
    for (let i = 0; i < 30; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * 360,
        type: types[Math.floor(Math.random() * types.length)],
        duration: Math.random() * 30 + 20,
      });
    }
    setShapes(newShapes);
  }, []);

  const getClipPath = (type: GeometricShape['type']) => {
    switch (type) {
      case 'triangle':
        return 'polygon(50% 0%, 100% 100%, 0% 100%)';
      case 'hexagon':
        return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      case 'diamond':
        return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      default:
        return 'none';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Diagonal Lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              hsl(var(--foreground)),
              hsl(var(--foreground)) 1px,
              transparent 1px,
              transparent 100px
            )
          `,
        }} />
      </div>

      {/* Floating Geometric Shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute border border-foreground/5"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            clipPath: getClipPath(shape.type),
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
            opacity: [0.02, 0.08, 0.02],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Large Geometric Accent */}
      <motion.div
        className="absolute -right-[20%] top-[10%] w-[600px] h-[600px] border border-foreground/5"
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute -left-[15%] bottom-[5%] w-[500px] h-[500px] border border-foreground/5"
        animate={{
          rotate: [0, -360],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50" />
    </div>
  );
};

export default AnimatedBackground;
