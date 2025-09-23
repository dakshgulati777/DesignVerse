import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Zap, Layers, Minimize2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Principle {
  id: string;
  title: string;
  category: 'Graphic' | 'Animation' | 'VFX' | 'UI/UX';
  description: string;
  example: string;
  icon: any;
}

const DesignPrinciples = () => {
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [filteredPrinciples, setFilteredPrinciples] = useState<Principle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Graphic', 'Animation', 'VFX', 'UI/UX'];

  // Sample design principles
  const samplePrinciples: Principle[] = [
    {
      id: '1',
      title: 'Rule of Thirds',
      category: 'Graphic',
      description: 'Divide your composition into nine equal sections with two horizontal and two vertical lines. Place important elements along these lines or at their intersections.',
      example: 'Photography, web layouts, poster design',
      icon: Layers
    },
    {
      id: '2',
      title: 'Easing Functions',
      category: 'Animation',
      description: 'Use different easing curves to make animations feel natural and engaging. Ease-in-out creates smooth, organic motion.',
      example: 'Button hovers, page transitions, loading animations',
      icon: Zap
    },
    {
      id: '3',
      title: 'Motion Blur',
      category: 'VFX',
      description: 'Add realistic blur to fast-moving objects to create a sense of speed and smooth motion in your animations.',
      example: 'Racing scenes, action sequences, UI transitions',
      icon: Eye
    },
    {
      id: '4',
      title: 'Visual Hierarchy',
      category: 'UI/UX',
      description: 'Organize elements by importance using size, color, contrast, and spacing to guide user attention through your interface.',
      example: 'Headlines, call-to-action buttons, navigation menus',
      icon: Minimize2
    },
    {
      id: '5',
      title: 'Golden Ratio',
      category: 'Graphic',
      description: 'Use the mathematical ratio of 1:1.618 to create harmonious proportions and naturally pleasing compositions.',
      example: 'Logo design, layout proportions, spacing systems',
      icon: Layers
    },
    {
      id: '6',
      title: 'Anticipation',
      category: 'Animation',
      description: 'Add a small movement in the opposite direction before the main action to prepare viewers for what comes next.',
      example: 'Character animations, button interactions, loading states',
      icon: Zap
    },
    {
      id: '7',
      title: 'Depth of Field',
      category: 'VFX',
      description: 'Use selective focus to draw attention to important elements while creating a sense of depth and realism.',
      example: 'Hero images, product showcases, cinematic effects',
      icon: Eye
    },
    {
      id: '8',
      title: 'Fitts\' Law',
      category: 'UI/UX',
      description: 'The time to reach a target depends on its size and distance. Make important buttons larger and closer to users.',
      example: 'Mobile interfaces, desktop applications, web forms',
      icon: Minimize2
    }
  ];

  useEffect(() => {
    setPrinciples(samplePrinciples);
    setFilteredPrinciples(samplePrinciples);
  }, []);

  useEffect(() => {
    let filtered = principles;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(principle => principle.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(principle =>
        principle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        principle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        principle.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPrinciples(filtered);
  }, [searchTerm, selectedCategory, principles]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Graphic': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Animation': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'VFX': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'UI/UX': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="principles" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 glass-nav mb-6">
            <Search className="w-5 h-5 text-primary" />
            <span className="font-medium">Design Principles</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Master the
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Fundamentals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore essential design, animation, and VFX principles to elevate your creative work
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-card max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search principles, categories, or descriptions..."
                  className="pl-10 bg-white/5 border-white/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category 
                        ? 'bg-primary text-primary-foreground' 
                        : 'btn-glass'
                    }`}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredPrinciples.length} of {principles.length} principles
            </div>
          </div>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrinciples.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <motion.div
                key={principle.id}
                className="parallax-card group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {principle.title}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getCategoryColor(principle.category)}`}>
                      {principle.category}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {principle.description}
                </p>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm font-medium text-primary">
                    Examples: <span className="font-normal text-muted-foreground">{principle.example}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

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
    </section>
  );
};

export default DesignPrinciples;