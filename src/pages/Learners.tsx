import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Eye, Zap, Layers, Minimize2, Palette, Type, Layout, 
  Image, Briefcase, Users, Monitor, Lightbulb, Code, Sparkles, Target, 
  Cpu, ArrowLeft, Menu, X 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer';

interface Principle {
  id: string;
  title: string;
  category: 'Design Principles' | 'Color Fundamentals' | 'Typography' | 'Layout & Composition' | 'Imagery & Visuals' | 'Branding & Identity' | 'UX & UI Basics' | 'Digital Design' | 'Design Tools' | 'Visual Communication' | 'Print & Production' | 'Modern Trends';
  description: string;
  example: string;
  icon: any;
}

const LearnersContent = ({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) => {
  const navigate = useNavigate();
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [filteredPrinciples, setFilteredPrinciples] = useState<Principle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Design Principles', 'Color Fundamentals', 'Typography', 'Layout & Composition', 'Imagery & Visuals', 'Branding & Identity', 'UX & UI Basics', 'Digital Design', 'Design Tools', 'Visual Communication', 'Print & Production', 'Modern Trends'];

  // All comprehensive design principles with more complete data
  const samplePrinciples: Principle[] = [
    // Design Principles
    {
      id: '1',
      title: 'Balance (Symmetry, Asymmetry, Radial)',
      category: 'Design Principles',
      description: 'Achieve visual equilibrium through symmetrical (mirror-like), asymmetrical (weighted), or radial (center-focused) arrangements of elements.',
      example: 'Symmetrical logos, asymmetrical web layouts, radial badges',
      icon: Layers
    },
    {
      id: '2',
      title: 'Contrast',
      category: 'Design Principles',
      description: 'Create visual interest and hierarchy by using opposing elements like light vs dark, large vs small, or thick vs thin.',
      example: 'High contrast text for readability, contrasting colors for emphasis',
      icon: Eye
    },
    {
      id: '3',
      title: 'Emphasis & Focus',
      category: 'Design Principles',
      description: 'Direct attention to key elements using size, color, position, or isolation to create focal points in your design.',
      example: 'Call-to-action buttons, hero headlines, featured products',
      icon: Target
    },
    {
      id: '4',
      title: 'Proportion & Scale',
      category: 'Design Principles',
      description: 'Use relative size relationships between elements to create harmony, hierarchy, and visual interest in compositions.',
      example: 'Golden ratio layouts, modular typography scales, responsive sizing',
      icon: Minimize2
    },
    {
      id: '5',
      title: 'Alignment',
      category: 'Design Principles',
      description: 'Create order and connection by positioning elements along common edges or centers for clean, professional layouts.',
      example: 'Grid-based layouts, centered text, aligned form fields',
      icon: Layout
    },
    {
      id: '6',
      title: 'Repetition & Consistency',
      category: 'Design Principles',
      description: 'Establish visual unity by repeating design elements like colors, fonts, shapes, or spacing throughout your work.',
      example: 'Brand consistency, button styles, icon sets, spacing patterns',
      icon: Sparkles
    },
    // Color Fundamentals
    {
      id: '7',
      title: 'Color Harmony',
      category: 'Color Fundamentals',
      description: 'Create pleasing color combinations using color wheel relationships like complementary, analogous, or triadic schemes.',
      example: 'Complementary blue-orange, analogous blues-greens, triadic red-yellow-blue',
      icon: Palette
    },
    {
      id: '8',
      title: 'Color Psychology',
      category: 'Color Fundamentals',
      description: 'Understand how colors evoke emotions and influence behavior in design applications.',
      example: 'Red for urgency, blue for trust, green for nature, purple for luxury',
      icon: Eye
    },
    // Typography
    {
      id: '9',
      title: 'Font Pairing',
      category: 'Typography',
      description: 'Combine typefaces that complement each other while maintaining readability and visual hierarchy.',
      example: 'Serif headings with sans-serif body, script accents with clean text',
      icon: Type
    },
    {
      id: '10',
      title: 'Hierarchy & Scale',
      category: 'Typography',
      description: 'Use size, weight, and spacing to guide readers through content in order of importance.',
      example: 'H1-H6 progression, bold for emphasis, increased line spacing',
      icon: Layers
    },
    // Layout & Composition
    {
      id: '11',
      title: 'Grid Systems',
      category: 'Layout & Composition',
      description: 'Organize content using structured column and row systems for consistent, balanced layouts.',
      example: '12-column grids, modular grids, baseline grids',
      icon: Layout
    },
    {
      id: '12',
      title: 'White Space',
      category: 'Layout & Composition',
      description: 'Use empty space strategically to improve readability, focus attention, and create visual breathing room.',
      example: 'Margins, padding, line spacing, content separation',
      icon: Minimize2
    },
    // Imagery & Visuals
    {
      id: '13',
      title: 'Visual Hierarchy',
      category: 'Imagery & Visuals',
      description: 'Arrange visual elements to guide the viewer\'s eye through content in order of importance.',
      example: 'Size contrast, color emphasis, positioning, depth',
      icon: Image
    },
    {
      id: '14',
      title: 'Image Composition',
      category: 'Imagery & Visuals',
      description: 'Apply photography principles like rule of thirds and leading lines to create compelling visuals.',
      example: 'Rule of thirds, symmetry, framing, depth of field',
      icon: Target
    },
    // UX & UI Basics
    {
      id: '15',
      title: 'User-Centered Design',
      category: 'UX & UI Basics',
      description: 'Design with the user\'s needs, goals, and behaviors as the primary consideration.',
      example: 'User personas, journey mapping, usability testing',
      icon: Users
    },
    {
      id: '16',
      title: 'Interface Patterns',
      category: 'UX & UI Basics',
      description: 'Use established UI conventions to create intuitive and familiar user experiences.',
      example: 'Navigation menus, button styles, form layouts, card designs',
      icon: Monitor
    }
  ];

  useEffect(() => {
    setPrinciples(samplePrinciples);
    setFilteredPrinciples(samplePrinciples);
  }, []);

  useEffect(() => {
    let filtered = principles;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(principle => principle.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(principle =>
        principle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        principle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        principle.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPrinciples(filtered);
  }, [principles, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Design Learning Hub</h1>
        </div>
        
        {/* Search */}
        <div className="flex items-center gap-2 max-w-sm md:max-w-md w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search principles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-nav text-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPrinciples.map((principle, index) => (
            <motion.div
              key={principle.id}
              className="parallax-card group cursor-pointer hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <principle.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {principle.title}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {principle.category}
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-3 leading-relaxed">
                {principle.description}
              </p>
              
              <div className="pt-3 border-t border-border/30">
                <p className="text-sm font-medium text-accent">
                  Examples: {principle.example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPrinciples.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No principles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryDrawer = ({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) => {
  const categories = [
    { id: 'All', label: 'All Topics', icon: Lightbulb },
    { id: 'Design Principles', label: 'Design Principles', icon: Layers },
    { id: 'Color Fundamentals', label: 'Color Theory', icon: Palette },
    { id: 'Typography', label: 'Typography', icon: Type },
    { id: 'Layout & Composition', label: 'Layout & Composition', icon: Layout },
    { id: 'Imagery & Visuals', label: 'Imagery & Visuals', icon: Image },
    { id: 'Branding & Identity', label: 'Branding & Identity', icon: Briefcase },
    { id: 'UX & UI Basics', label: 'UX & UI Basics', icon: Users },
    { id: 'Digital Design', label: 'Digital Design', icon: Monitor },
    { id: 'Design Tools', label: 'Design Tools', icon: Code },
    { id: 'Visual Communication', label: 'Visual Communication', icon: Eye },
    { id: 'Print & Production', label: 'Print & Production', icon: Filter },
    { id: 'Modern Trends', label: 'Modern Trends', icon: Sparkles },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-md">
          <Menu className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-semibold">Learning Topics</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto">
          <div className="space-y-2">
            {categories.map((category) => (
              <DrawerClose key={category.id} asChild>
                <Button
                  variant="ghost"
                  onClick={() => onCategoryChange(category.id)}
                  className={`w-full justify-start gap-3 py-3 h-auto ${
                    selectedCategory === category.id 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span className="font-medium">{category.label}</span>
                </Button>
              </DrawerClose>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Learners = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <CategoryDrawer selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <LearnersContent selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
    </div>
  );
};

export default Learners;