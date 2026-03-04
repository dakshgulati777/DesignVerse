import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Swords } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pixuHappy from '@/assets/pixu-happy.png';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-blob"
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { size: 'w-16 h-16', pos: 'top-[15%] left-[10%]', delay: '0s', bg: 'bg-primary/10' },
          { size: 'w-12 h-12', pos: 'top-[25%] right-[15%]', delay: '1s', bg: 'bg-accent/15' },
          { size: 'w-20 h-20', pos: 'bottom-[20%] left-[20%]', delay: '2s', bg: 'bg-primary/8' },
          { size: 'w-10 h-10', pos: 'bottom-[30%] right-[10%]', delay: '3s', bg: 'bg-accent/10' },
        ].map((shape, i) => (
          <div
            key={i}
            className={`absolute ${shape.size} ${shape.pos} ${shape.bg} rounded-2xl animate-float-slow`}
            style={{ animationDelay: shape.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium font-inter text-primary">Welcome to DesignVerse</span>
            </div>

            <h1 className="font-clash font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[82px] leading-[0.95] tracking-tight text-foreground mb-6">
              Create.
              <br />
              <span className="text-primary">Compete.</span>
              <br />
              Get Hired.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-inter font-normal max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
              A creative playground for designers to showcase work, battle creativity, and get discovered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/upload')}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Upload Work
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-glass flex items-center justify-center gap-2 border border-border"
              >
                Explore Designs
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/battles')}
                className="btn-glass flex items-center justify-center gap-2 border border-accent/30 text-accent-foreground"
              >
                <Swords className="w-4 h-4" />
                Enter Battle Arena
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Pixu Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 100 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            {/* Glow behind Pixu */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110" />
            <img
              src={pixuHappy}
              alt="Pixu - DesignVerse mascot waving hello"
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain pixu-bounce drop-shadow-2xl"
            />
            {/* Speech bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200 }}
              className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-2 shadow-lg"
            >
              <span className="text-sm font-satoshi font-bold text-foreground">Hey there! 👋</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
