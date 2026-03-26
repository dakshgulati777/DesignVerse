import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import BrandSetup from '@/components/brand-kit/BrandSetup';
import ContentGenerator from '@/components/brand-kit/ContentGenerator';
import ContentCalendar from '@/components/brand-kit/ContentCalendar';
import { toast } from '@/hooks/use-toast';

export interface BrandProfile {
  brandName: string;
  brandColors: string[];
  logoUrl?: string;
  tagline: string;
  tone: string;
}

export interface GeneratedContent {
  content_type: 'reel' | 'post' | 'story';
  schedule_day: string;
  caption: string;
  hashtags: string[];
  visual_description: string;
  hook: string;
  imageUrl?: string;
  videoUrl?: string;
  videoPrompt?: string;
}

const BrandKit = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'setup' | 'generate' | 'calendar'>('setup');
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);

  if (!loading && !user) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <div className="flex flex-col items-center justify-center min-h-screen px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-lg space-y-6"
            >
              <div className="w-20 h-20 mx-auto border-2 border-foreground/20 flex items-center justify-center"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                <span className="text-2xl">🎨</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Brand-Kit Generator</h1>
              <p className="text-muted-foreground text-lg">
                Upload your product photo → Get a full week's Instagram content with Hinglish captions, brand colors & posting schedule.
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-3 bg-foreground text-background font-semibold tracking-wider hover:opacity-90 transition-opacity"
              >
                SIGN IN TO START
              </button>
            </motion.div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const handleBrandSetup = (profile: BrandProfile) => {
    setBrandProfile(profile);
    setStep('generate');
  };

  const handleContentGenerated = (content: GeneratedContent[]) => {
    setGeneratedContent(content);
    setStep('calendar');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-24 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {['Brand Setup', 'Upload & Generate', 'Content Calendar'].map((label, i) => {
              const stepKeys = ['setup', 'generate', 'calendar'] as const;
              const isActive = stepKeys.indexOf(step) >= i;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-colors ${
                    isActive ? 'bg-foreground text-background' : 'border border-foreground/20 text-muted-foreground'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`hidden md:block text-sm tracking-wider ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {label}
                  </span>
                  {i < 2 && <div className="w-8 md:w-16 h-[1px] bg-foreground/20" />}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {step === 'setup' && (
              <motion.div key="setup" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <BrandSetup onComplete={handleBrandSetup} />
              </motion.div>
            )}
            {step === 'generate' && brandProfile && (
              <motion.div key="generate" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <ContentGenerator brandProfile={brandProfile} onGenerated={handleContentGenerated} onBack={() => setStep('setup')} />
              </motion.div>
            )}
            {step === 'calendar' && (
              <motion.div key="calendar" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <ContentCalendar content={generatedContent} brandProfile={brandProfile!} onBack={() => setStep('generate')} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default BrandKit;
