import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ColorPalettes from '@/components/ColorPalettes';
import FontSection from '@/components/FontSection';
import BlogSection from '@/components/BlogSection';
import DesignPrinciples from '@/components/DesignPrinciples';
import CustomCursor from '@/components/CustomCursor';
import AnimatedBackground from '@/components/AnimatedBackground';
import Preloader from '@/components/Preloader';
import OnboardingTutorial from '@/components/OnboardingTutorial';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('designverse_onboarding_complete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <ThemeProvider>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLoading && showOnboarding && <OnboardingTutorial onComplete={handleOnboardingComplete} />}
      
      <div className={`min-h-screen bg-background text-foreground cursor-none ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <CustomCursor />
        <AnimatedBackground />
        <Navigation />
        <main className="relative z-10">
          <HeroSection />
          <ColorPalettes />
          <FontSection />
          <BlogSection />
          <DesignPrinciples />
        </main>
        
        {/* Footer */}
        <footer className="py-16 px-6 border-t border-foreground/10 relative">
          {/* Geometric decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border border-foreground/20 rotate-45" />
          </div>
          
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-3 border border-foreground/20 px-4 py-2">
              <div 
                className="w-8 h-8 bg-foreground flex items-center justify-center"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
              >
                <span className="text-xs font-bold text-background">DV</span>
              </div>
              <span className="font-bold tracking-wider">DESIGNVERSE</span>
            </div>
            <div>
              <p className="text-muted-foreground text-sm tracking-widest">
                Crafted with ♥ for designers, by designers
              </p>
              <p className="text-lg font-semibold mt-3 tracking-widest">
                DAKSH GULATI
              </p>
            </div>
            
            {/* Contact Section */}
            <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
              <a 
                href="mailto:dakshgulati77@gmail.com" 
                className="w-12 h-12 border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </a>
            </div>
            
            {/* Bottom border decoration */}
            <div className="flex items-center justify-center gap-4 pt-8">
              <div className="w-16 h-[1px] bg-foreground/20" />
              <div className="w-2 h-2 border border-foreground/30 rotate-45" />
              <div className="w-16 h-[1px] bg-foreground/20" />
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
