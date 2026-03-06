import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pixuMain from '@/assets/pixu-main.png';

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { number: '10K+', label: 'Designers' },
    { number: '50K+', label: 'Designs' },
    { number: '5K+', label: 'Battles' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-primary">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-foreground/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        {/* Decorative shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[20%] left-[8%] w-16 h-16 border-2 border-primary-foreground/20 rounded-xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-[25%] left-[15%] w-8 h-8 bg-accent/40 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[30%] right-[12%] w-12 h-12 border-2 border-accent/30 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-8">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium font-inter text-primary-foreground">
                  The creative platform for designers
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-clash font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.95] tracking-tight text-primary-foreground mb-6">
                Supercharge
                <br />
                your design
                <br />
                <span className="text-accent">career</span>
              </h1>

              <p className="text-lg md:text-xl text-primary-foreground/70 font-inter font-normal max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
                Showcase work, compete in battles, access powerful tools, and get discovered by top companies.
              </p>

              {/* Stats pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-2xl px-5 py-3 text-center"
                  >
                    <div className="font-clash font-bold text-2xl text-primary-foreground">{stat.number}</div>
                    <div className="text-xs font-inter text-primary-foreground/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/upload')}
                  className="bg-accent text-accent-foreground rounded-2xl px-8 py-4 font-semibold text-base flex items-center justify-center gap-2 shadow-lg"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground rounded-2xl px-8 py-4 font-semibold text-base flex items-center justify-center gap-2"
                >
                  Explore Designs
                </motion.button>
              </div>

              {/* Trust bar */}
              <div className="flex items-center gap-2 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary" />
                  ))}
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm font-inter text-primary-foreground/60">
                  Loved by 10,000+ designers
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right - Pixu mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="flex-shrink-0 relative"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-125" />
              <img
                src={pixuMain}
                alt="Pixu - DesignVerse mascot"
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] object-contain pixu-bounce drop-shadow-2xl"
              />
              {/* Speech bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                className="absolute -top-2 -right-2 bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-2 shadow-lg"
              >
                <span className="text-sm font-satoshi font-bold text-foreground">Let's create! 🎨</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-primary-foreground/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
