import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ColorPalettes from '@/components/ColorPalettes';
import BlogSection from '@/components/BlogSection';
import DesignPrinciples from '@/components/DesignPrinciples';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <HeroSection />
          <ColorPalettes />
          <BlogSection />
          <DesignPrinciples />
        </main>
        
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="glass-nav inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">DV</span>
              </div>
              <span className="font-bold">DesignVerse</span>
            </div>
            <p className="text-muted-foreground">
              Crafted with ♥ for designers, by designers
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
