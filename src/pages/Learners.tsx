import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowLeft, Menu, X, Bookmark, BookmarkCheck
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
import { designFundamentals, type DesignFundamental } from '@/data/designFundamentals';
import { 
  Eye, Filter, Layers, Palette, Type, Layout, 
  Image, Briefcase, Users, Monitor, Lightbulb, Code, Sparkles
} from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const LearnersContent = ({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) => {
  const navigate = useNavigate();
  const [principles, setPrinciples] = useState<DesignFundamental[]>([]);
  const [filteredPrinciples, setFilteredPrinciples] = useState<DesignFundamental[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrinciple, setSelectedPrinciple] = useState<DesignFundamental | null>(null);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { fadeInUp } = useScrollAnimation();

  useEffect(() => {
    setPrinciples(designFundamentals);
    setFilteredPrinciples(designFundamentals);
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-border/50 gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover-glow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Design Learning Hub
          </h1>
        </div>
        
        {/* Search */}
        <div className="flex items-center gap-2 w-full md:max-w-sm lg:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search principles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-nav text-sm hover-glow"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredPrinciples.map((principle, index) => (
            <motion.div
              key={principle.id}
              className="parallax-card group cursor-pointer hover-glow transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedPrinciple(principle)}
            >
              <img src={principle.image} alt={principle.title} className="w-full h-40 object-cover rounded-lg mb-4" />
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    const bookmarked = isBookmarked('fundamental', principle.id);
                    if (bookmarked) {
                      removeBookmark('fundamental', principle.id);
                    } else {
                      addBookmark('fundamental', principle.id, principle);
                    }
                  }}
                  className="p-2 hover:text-primary"
                >
                  {isBookmarked('fundamental', principle.id) ? (
                    <BookmarkCheck className="w-4 h-4 fill-current" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <p className="text-muted-foreground mb-3 leading-relaxed text-sm line-clamp-3">
                {principle.description}
              </p>
              
              <div className="pt-3 border-t border-border/30">
                <p className="text-sm font-medium text-accent line-clamp-1">
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPrinciple && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPrinciple(null)}
          >
            <motion.div
              className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPrinciple.image} alt={selectedPrinciple.title} className="w-full h-64 object-cover rounded-t-lg mb-6" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-primary/20 text-primary">
                      <selectedPrinciple.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedPrinciple.title}</h2>
                      <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {selectedPrinciple.category}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedPrinciple(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{selectedPrinciple.detailedContent}</p>
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Examples</h3>
                    <p className="text-muted-foreground">{selectedPrinciple.example}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoryDrawer = ({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) => {
  // Get unique categories from the actual design fundamentals data
  const allCategories = Array.from(new Set(designFundamentals.map(f => f.category)));
  
  const categoryIconMap: Record<string, any> = {
    'Design Principles': Layers,
    'Color Fundamentals': Palette,
    'Typography': Type,
    'Layout & Composition': Layout,
    'Shape & Form': Image,
    'UI Design': Monitor,
    'Motion & Animation': Sparkles,
    'Branding': Briefcase,
    'UX Process': Users,
    'Modern Trends': Sparkles,
  };

  const categories = [
    { id: 'All', label: 'All Topics', icon: Lightbulb },
    ...allCategories.map(cat => ({
      id: cat,
      label: cat,
      icon: categoryIconMap[cat] || Code
    }))
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="fixed top-20 md:top-24 left-4 z-50 bg-background/90 backdrop-blur-md hover-glow border border-primary/20">
          <Menu className="w-4 h-4" />
          <span className="hidden sm:inline ml-2">Categories</span>
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