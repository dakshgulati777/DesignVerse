import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Palette, Type, Layers, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingTutorialProps {
  onComplete: () => void;
}

const tutorialSteps = [
  {
    id: 1,
    title: 'Welcome to DesignVerse',
    description: 'Your premium creative design platform. Explore infinite possibilities with our AI-powered tools and curated resources.',
    icon: Sparkles,
    highlight: 'hero',
  },
  {
    id: 2,
    title: 'Color Palettes',
    description: 'Generate AI-powered color palettes, extract colors from images, and explore color harmony with our interactive tools.',
    icon: Palette,
    highlight: 'colors',
  },
  {
    id: 3,
    title: 'Typography Lab',
    description: 'Discover beautiful font pairings, download fonts directly, and explore our collection of 100+ premium typefaces.',
    icon: Type,
    highlight: 'fonts',
  },
  {
    id: 4,
    title: 'Texture Library',
    description: 'Access 1000+ free textures in multiple formats. Download directly and use in your creative projects.',
    icon: Layers,
    highlight: 'textures',
  },
  {
    id: 5,
    title: 'Design Fundamentals',
    description: 'Master 50+ design principles with detailed guides, examples, and visual references to elevate your skills.',
    icon: BookOpen,
    highlight: 'fundamentals',
  },
];

const OnboardingTutorial = ({ onComplete }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('designverse_onboarding_complete', 'true');
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  const handleSkip = () => {
    handleComplete();
  };

  const currentTutorial = tutorialSteps[currentStep];
  const Icon = currentTutorial.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Tutorial Card */}
          <motion.div
            className="relative z-10 max-w-lg w-full"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
              {/* Header with geometric pattern */}
              <div className="relative h-40 bg-foreground/5 overflow-hidden">
                {/* Geometric shapes */}
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border border-foreground/10"
                      style={{
                        width: `${30 + i * 10}px`,
                        height: `${30 + i * 10}px`,
                        left: `${10 + i * 8}%`,
                        top: `${20 + (i % 3) * 20}%`,
                        transform: `rotate(${i * 15}deg)`,
                      }}
                      animate={{
                        rotate: [i * 15, i * 15 + 360],
                      }}
                      transition={{
                        duration: 20 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>

                {/* Icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  key={currentStep}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <div className="w-20 h-20 bg-foreground flex items-center justify-center"
                    style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                  >
                    <Icon className="w-10 h-10 text-background" />
                  </div>
                </motion.div>

                {/* Close button */}
                <button
                  onClick={handleSkip}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background/50 hover:bg-background/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <motion.h2
                  className="text-2xl font-bold mb-3"
                  key={`title-${currentStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentTutorial.title}
                </motion.h2>
                <motion.p
                  className="text-muted-foreground leading-relaxed"
                  key={`desc-${currentStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentTutorial.description}
                </motion.p>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pb-4">
                {tutorialSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'w-6 bg-foreground'
                        : 'bg-foreground/30 hover:bg-foreground/50'
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-border flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-muted-foreground"
                >
                  Skip Tour
                </Button>

                <Button
                  onClick={handleNext}
                  className="gap-2 bg-foreground text-background hover:bg-foreground/90"
                >
                  {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingTutorial;
