import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import { TrendingDesigns, TopDesigners, LatestBattles, ToolsPreview, Footer } from '@/components/HomeSections';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <TrendingDesigns />
        <TopDesigners />
        <LatestBattles />
        <ToolsPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
