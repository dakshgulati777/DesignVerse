import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
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

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Geometric Background Pattern */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground) / 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating Geometric Shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-foreground/10"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${5 + i * 6}%`,
              top: `${10 + (i % 5) * 18}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Triangles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`tri-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div 
              className="w-8 h-8 bg-foreground/5"
              style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
            />
          </motion.div>
        ))}

        {/* Hexagons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              right: `${10 + i * 15}%`,
              bottom: `${15 + (i % 2) * 30}%`,
            }}
            animate={{
              rotate: [0, -360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div 
              className="w-12 h-12 border border-foreground/10"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            />
          </motion.div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </motion.div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <div 
              className="w-2 h-2 bg-foreground"
              style={{ clipPath: i % 2 === 0 ? 'polygon(50% 0%, 100% 100%, 0% 100%)' : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            />
          </motion.div>
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
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 mb-8"
            whileHover={{ scale: 1.02, borderColor: 'hsl(var(--foreground) / 0.4)' }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-widest uppercase">Welcome to the Future of Design</span>
          </motion.div>

          <motion.h1 
            className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-foreground">Design</span>
            <br />
            <motion.span 
              className="text-foreground/80"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Verse
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore infinite color palettes, discover design principles, and immerse yourself in a premium creative experience.
          </motion.p>

        </motion.div>

        {/* Geometric Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              className="w-4 h-4 border border-foreground/40"
              style={{ clipPath: 'polygon(50% 100%, 100% 0%, 0% 0%)' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="w-3 h-3 border border-foreground/30"
              style={{ clipPath: 'polygon(50% 100%, 100% 0%, 0% 0%)' }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
          </div>
        </motion.div>
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