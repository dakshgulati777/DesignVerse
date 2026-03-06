import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import { HowItWorks, TrendingDesigns, CtaSection, WhyDesignVerse, TopDesigners, LatestBattles, ToolsPreview, FinalCta, Footer } from '@/components/HomeSections';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorks />
        <TrendingDesigns />
        <CtaSection />
        <WhyDesignVerse />
        <TopDesigners />
        <LatestBattles />
        <ToolsPreview />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
