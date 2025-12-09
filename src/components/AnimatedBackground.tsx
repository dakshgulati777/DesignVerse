import { memo, useMemo } from 'react';

interface GeometricShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: 'square' | 'triangle' | 'hexagon' | 'diamond';
  animationDelay: number;
}

const AnimatedBackground = memo(() => {
  const shapes = useMemo(() => {
    const newShapes: GeometricShape[] = [];
    const types: GeometricShape['type'][] = ['square', 'triangle', 'hexagon', 'diamond'];
    
    // Reduced from 30 to 12 shapes for better performance
    for (let i = 0; i < 12; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * 360,
        type: types[Math.floor(Math.random() * types.length)],
        animationDelay: Math.random() * 10,
      });
    }
    return newShapes;
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
      {/* Grid Pattern - CSS only, no JS animation */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Floating Geometric Shapes - CSS animations only */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute border border-foreground/5 animate-float-slow"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            clipPath: getClipPath(shape.type),
            animationDelay: `${shape.animationDelay}s`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
        />
      ))}

      {/* Large Geometric Accent - CSS animation only */}
      <div
        className="absolute -right-[20%] top-[10%] w-[600px] h-[600px] border border-foreground/5 animate-spin-slow"
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
      />

      <div
        className="absolute -left-[15%] bottom-[5%] w-[500px] h-[500px] border border-foreground/5 animate-spin-reverse"
      />

      {/* Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50" />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;