import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Eye, Zap, Layers, Minimize2, Palette, Type, Layout, Image, Briefcase, Users, Monitor, Lightbulb, Code, Sparkles, Target, Cpu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Principle {
  id: string;
  title: string;
  category: 'Design Principles' | 'Color Fundamentals' | 'Typography' | 'Layout & Composition' | 'Imagery & Visuals' | 'Branding & Identity' | 'UX & UI Basics' | 'Digital Design' | 'Design Tools' | 'Visual Communication' | 'Print & Production' | 'Modern Trends';
  description: string;
  example: string;
  icon: any;
  detailedInfo: string;
}

const DesignPrinciples = () => {
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [filteredPrinciples, setFilteredPrinciples] = useState<Principle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPrinciple, setSelectedPrinciple] = useState<Principle | null>(null);
  const navigate = useNavigate();

  const categories = ['All', 'Design Principles', 'Color Fundamentals', 'Typography', 'Layout & Composition', 'Imagery & Visuals', 'Branding & Identity', 'UX & UI Basics', 'Digital Design', 'Design Tools', 'Visual Communication', 'Print & Production', 'Modern Trends'];

  // Comprehensive design principles with detailed information
  const samplePrinciples: Principle[] = [
    {
      id: '1',
      title: 'Balance (Symmetry, Asymmetry, Radial)',
      category: 'Design Principles',
      description: 'Achieve visual equilibrium through symmetrical (mirror-like), asymmetrical (weighted), or radial (center-focused) arrangements of elements.',
      example: 'Symmetrical logos, asymmetrical web layouts, radial badges',
      icon: Layers,
      detailedInfo: 'Balance is the distribution of visual weight in a design. Symmetrical balance creates formal, stable designs through mirror-like arrangements, perfect for logos and traditional layouts. Asymmetrical balance uses different elements of varying weights to create dynamic, interesting compositions that guide the eye naturally. Radial balance arranges elements around a central point, creating circular patterns ideal for badges and medallions. Understanding balance helps create harmonious designs that feel stable yet engaging. Consider the visual weight of colors (darker = heavier), sizes (larger = heavier), and textures (complex = heavier) when balancing your compositions.'
    },
    {
      id: '2',
      title: 'Contrast',
      category: 'Design Principles',
      description: 'Create visual interest and hierarchy by using opposing elements like light vs dark, large vs small, or thick vs thin.',
      example: 'High contrast text for readability, contrasting colors for emphasis',
      icon: Eye,
      detailedInfo: 'Contrast is one of the most powerful tools in design. It creates visual interest, establishes hierarchy, and improves readability. Use contrasting colors for important elements, vary sizes for emphasis, and combine thick and thin lines for dynamic layouts. High contrast improves accessibility and helps users quickly identify important information.'
    },
    {
      id: '3',
      title: 'Emphasis & Focus',
      category: 'Design Principles',
      description: 'Direct attention to key elements using size, color, position, or isolation to create focal points in your design.',
      example: 'Call-to-action buttons, hero headlines, featured products',
      icon: Target,
      detailedInfo: 'Emphasis guides viewers to the most important elements first. Create focal points through size (make it bigger), color (use contrasting or bright colors), position (center or top placement), or isolation (surround with white space). Every design should have a clear hierarchy with one primary focal point and supporting secondary elements.'
    },
    {
      id: '4',
      title: 'Proportion & Scale',
      category: 'Design Principles',
      description: 'Use relative size relationships between elements to create harmony, hierarchy, and visual interest in compositions.',
      example: 'Golden ratio layouts, modular typography scales, responsive sizing',
      icon: Minimize2,
      detailedInfo: 'Proportion and scale define size relationships between elements. The golden ratio (1:1.618) creates naturally pleasing proportions. Modular scales create harmonious typography systems. Use scale to establish hierarchy - larger elements feel more important. Maintain consistent proportions across your design for visual unity.'
    },
    {
      id: '5',
      title: 'Alignment',
      category: 'Design Principles',
      description: 'Create order and connection by positioning elements along common edges or centers for clean, professional layouts.',
      example: 'Grid-based layouts, centered text, aligned form fields',
      icon: Layout,
      detailedInfo: 'Alignment creates invisible connections between elements, bringing order to chaos. Use grid systems for consistent alignment. Align text to edges or centers. Maintain vertical rhythm in typography. Even in asymmetrical designs, elements should align to invisible grid lines for professional results.'
    },
    {
      id: '6',
      title: 'Repetition & Consistency',
      category: 'Design Principles',
      description: 'Establish visual unity by repeating design elements like colors, fonts, shapes, or spacing throughout your work.',
      example: 'Brand consistency, button styles, icon sets, spacing patterns',
      icon: Sparkles,
      detailedInfo: 'Repetition creates unity and strengthens brand identity. Repeat colors, fonts, spacing values, and shapes consistently. Create a design system with reusable components. Consistency builds user trust and makes interfaces predictable and easy to use. Establish patterns early and maintain them throughout.'
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
  }, [searchTerm, selectedCategory, principles]);

  const displayedPrinciples = filteredPrinciples.slice(0, 6);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Design Principles': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Color Fundamentals': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Typography': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Layout & Composition': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Imagery & Visuals': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Branding & Identity': 'bg-red-500/20 text-red-400 border-red-500/30',
      'UX & UI Basics': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Digital Design': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Design Tools': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Visual Communication': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      'Print & Production': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'Modern Trends': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <section id="principles" className="py-20 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 glass-nav mb-6">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span className="font-medium">Learn & Master</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Design
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Fundamentals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the essential principles that form the foundation of exceptional design
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search principles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-nav"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg glass-nav bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-background text-foreground">
                {category}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Principles Grid - Show only 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPrinciples.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <motion.div
                key={principle.id}
                className="parallax-card group cursor-pointer hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedPrinciple(principle)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {principle.title}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getCategoryColor(principle.category)}`}>
                      {principle.category}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                  {principle.description}
                </p>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-medium text-primary">
                    Examples: <span className="font-normal text-muted-foreground">{principle.example}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explore More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            onClick={() => navigate('/learners')}
            className="btn-primary group"
          >
            <span>Explore More Fundamentals</span>
            <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
          </Button>
        </motion.div>

        {/* Empty State */}
        {filteredPrinciples.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card max-w-md mx-auto">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No principles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or selected category
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="btn-glass"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Detailed View Modal */}
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
              className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-primary/20 text-primary">
                    {selectedPrinciple.icon && <selectedPrinciple.icon className="w-8 h-8" />}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedPrinciple.title}</h2>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getCategoryColor(selectedPrinciple.category)}`}>
                      {selectedPrinciple.category}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPrinciple(null)}
                  className="hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedPrinciple.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Detailed Information</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {selectedPrinciple.detailedInfo}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Examples</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedPrinciple.example}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Button onClick={() => setSelectedPrinciple(null)} className="btn-primary w-full">
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DesignPrinciples;
