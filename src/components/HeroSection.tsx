import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Memoize static shapes to prevent recalculation
  const floatingShapes = useMemo(() => 
    [...Array(6)].map((_, i) => ({
      id: i,
      width: 60 + i * 30,
      height: 60 + i * 30,
      left: `${10 + i * 15}%`,
      top: `${15 + (i % 3) * 25}%`,
      delay: i * 2,
    })), 
  []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Geometric Background Pattern - CSS only */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground) / 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating Geometric Shapes - CSS animations only */}
        {floatingShapes.map((shape) => (
          <div
            key={shape.id}
            className="absolute border border-foreground/10 animate-spin-slow"
            style={{
              width: shape.width,
              height: shape.height,
              left: shape.left,
              top: shape.top,
              animationDelay: `${shape.delay}s`,
              animationDuration: `${20 + shape.id * 5}s`,
            }}
          />
        ))}

        {/* Static Triangles with CSS animation */}
        <div 
          className="absolute left-[20%] top-[30%] w-8 h-8 bg-foreground/5 animate-float-slow"
          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', animationDelay: '0s' }}
        />
        <div 
          className="absolute left-[70%] top-[20%] w-10 h-10 bg-foreground/5 animate-float-slow"
          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', animationDelay: '2s' }}
        />
        <div 
          className="absolute left-[50%] bottom-[25%] w-6 h-6 bg-foreground/5 animate-float-slow"
          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', animationDelay: '4s' }}
        />

        {/* Static Hexagons with CSS animation */}
        <div 
          className="absolute right-[15%] bottom-[30%] w-12 h-12 border border-foreground/10 animate-spin-reverse"
          style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', animationDuration: '25s' }}
        />
        <div 
          className="absolute right-[40%] top-[15%] w-10 h-10 border border-foreground/10 animate-spin-reverse"
          style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', animationDuration: '30s' }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </motion.div>

      {/* Minimal Floating Particles - CSS only */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-foreground/20 animate-float-slow"
            style={{
              left: `${12 + i * 11}%`,
              top: `${20 + (i % 4) * 18}%`,
              animationDelay: `${i * 0.5}s`,
              clipPath: i % 2 === 0 ? 'polygon(50% 0%, 100% 100%, 0% 100%)' : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            }}
          />
        ))}
      </div>

      {/* Hero Content with Parallax */}
      <motion.div 
        className="relative z-20 text-center max-w-5xl mx-auto px-6"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 mb-8 hover:border-foreground/40 transition-colors">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-widest uppercase">Welcome to the Future of Design</span>
          </div>

          <motion.h1 
            className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-foreground">Design</span>
            <br />
            <span className="text-foreground/80">Verse</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore infinite color palettes, discover design principles, and immerse yourself in a premium creative experience.
          </motion.p>
        </motion.div>

        {/* Geometric Scroll Indicator - CSS animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <div 
              className="w-4 h-4 border border-foreground/40"
              style={{ clipPath: 'polygon(50% 100%, 100% 0%, 0% 0%)' }}
            />
            <div 
              className="w-3 h-3 border border-foreground/30"
              style={{ clipPath: 'polygon(50% 100%, 100% 0%, 0% 0%)' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l border-t border-foreground/20" />
      <div className="absolute top-8 right-8 w-24 h-24 border-r border-t border-foreground/20" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l border-b border-foreground/20" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-foreground/20" />
    </section>
  );
};

export default HeroSection;
