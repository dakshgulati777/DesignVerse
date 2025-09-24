import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Zap, Layers, Minimize2, Palette, Type, Layout, Image, Briefcase, Users, Monitor, Lightbulb, Code, Sparkles, Target, Cpu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Principle {
  id: string;
  title: string;
  category: 'Design Principles' | 'Color Fundamentals' | 'Typography' | 'Layout & Composition' | 'Imagery & Visuals' | 'Branding & Identity' | 'UX & UI Basics' | 'Digital Design' | 'Design Tools' | 'Visual Communication' | 'Print & Production' | 'Modern Trends';
  description: string;
  example: string;
  icon: any;
}

const DesignPrinciples = () => {
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [filteredPrinciples, setFilteredPrinciples] = useState<Principle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Design Principles', 'Color Fundamentals', 'Typography', 'Layout & Composition', 'Imagery & Visuals', 'Branding & Identity', 'UX & UI Basics', 'Digital Design', 'Design Tools', 'Visual Communication', 'Print & Production', 'Modern Trends'];

  // Comprehensive design principles
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
    {
      id: '7',
      title: 'White Space (Negative Space)',
      category: 'Design Principles',
      description: 'Use empty space strategically to improve readability, create breathing room, and draw attention to important elements.',
      example: 'Minimalist layouts, content margins, clean interfaces',
      icon: Minimize2
    },
    {
      id: '8',
      title: 'Unity & Harmony',
      category: 'Design Principles',
      description: 'Create cohesive designs where all elements work together through consistent style, color, and compositional relationships.',
      example: 'Cohesive brand systems, themed website designs, matching icon sets',
      icon: Layers
    },
    {
      id: '9',
      title: 'Movement & Flow',
      category: 'Design Principles',
      description: 'Guide the viewer\'s eye through your design using lines, shapes, colors, and placement to create visual pathways.',
      example: 'Reading patterns, navigation flows, animated transitions',
      icon: Zap
    },

    // Color Fundamentals
    {
      id: '10',
      title: 'Color Theory (Primary, Secondary, Tertiary)',
      category: 'Color Fundamentals',
      description: 'Understand the color wheel foundation: primary colors (red, blue, yellow), secondary (green, orange, purple), and tertiary combinations.',
      example: 'Brand color palettes, complementary schemes, triadic combinations',
      icon: Palette
    },
    {
      id: '11',
      title: 'Color Models (RGB, CMYK, HSL, LAB, Pantone)',
      category: 'Color Fundamentals',
      description: 'Different color systems for various applications: RGB for screens, CMYK for print, HSL for design, LAB for accuracy, Pantone for branding.',
      example: 'Web design (RGB), print materials (CMYK), brand guidelines (Pantone)',
      icon: Monitor
    },
    {
      id: '12',
      title: 'Color Schemes (Complementary, Analogous, Triadic, Monochromatic)',
      category: 'Color Fundamentals',
      description: 'Strategic color combinations: complementary (opposite), analogous (adjacent), triadic (three-point), monochromatic (single hue variations).',
      example: 'Website themes, poster designs, brand color systems',
      icon: Palette
    },
    {
      id: '13',
      title: 'Color Hierarchy & Usage in Design',
      category: 'Color Fundamentals',
      description: 'Use color strategically to establish information hierarchy, guide attention, and create visual flow in your designs.',
      example: 'Primary buttons, error states, navigation highlights, content categorization',
      icon: Target
    },
    {
      id: '14',
      title: 'Color Psychology & Emotions',
      category: 'Color Fundamentals',
      description: 'Understand how colors evoke emotions and cultural associations to communicate effectively with your audience.',
      example: 'Red for urgency/passion, blue for trust/calm, green for nature/growth',
      icon: Lightbulb
    },

    // Typography
    {
      id: '15',
      title: 'Anatomy of Type',
      category: 'Typography',
      description: 'Master typographic terminology: baseline, ascender, descender, x-height, cap height, serif, and other fundamental elements.',
      example: 'Font selection, custom lettering, type pairing decisions',
      icon: Type
    },
    {
      id: '16',
      title: 'Typeface vs. Font',
      category: 'Typography',
      description: 'Understand the distinction: typeface is the design (Helvetica), font is the specific file/weight (Helvetica Bold 18pt).',
      example: 'Font licensing, web font loading, typography specifications',
      icon: Type
    },
    {
      id: '17',
      title: 'Font Classifications',
      category: 'Typography',
      description: 'Learn major categories: serif (traditional), sans serif (modern), script (decorative), display (headlines), monospaced (code).',
      example: 'Body text (serif/sans), headlines (display), code blocks (monospace)',
      icon: Type
    },
    {
      id: '18',
      title: 'Typography Hierarchy',
      category: 'Typography',
      description: 'Create clear information structure using different sizes, weights, and styles for headings, subheadings, and body text.',
      example: 'Article layouts, website navigation, document formatting',
      icon: Layout
    },
    {
      id: '19',
      title: 'Font Pairing & Contrast',
      category: 'Typography',
      description: 'Combine fonts effectively by pairing complementary styles that create contrast while maintaining harmony.',
      example: 'Header + body combinations, serif + sans pairings, display + text fonts',
      icon: Type
    },

    // Layout & Composition
    {
      id: '20',
      title: 'Grid Systems (Rule of Thirds, Golden Ratio, Modular)',
      category: 'Layout & Composition',
      description: 'Use systematic approaches to organize content: rule of thirds for focal points, golden ratio for proportions, modular grids for consistency.',
      example: 'Photography composition, web layouts, magazine design, logo proportions',
      icon: Layout
    },
    {
      id: '21',
      title: 'Visual Hierarchy',
      category: 'Layout & Composition',
      description: 'Organize information by importance using size, color, contrast, position, and spacing to guide user attention.',
      example: 'Newspaper layouts, landing pages, app interfaces, infographics',
      icon: Target
    },
    {
      id: '22',
      title: 'Framing & Cropping',
      category: 'Layout & Composition',
      description: 'Control focus and meaning by selecting what to include or exclude in your visual frame or crop boundaries.',
      example: 'Photo editing, social media posts, banner designs, product photography',
      icon: Eye
    },

    // Imagery & Visuals
    {
      id: '23',
      title: 'Photography in Design',
      category: 'Imagery & Visuals',
      description: 'Integrate photography effectively through proper selection, editing, and placement to enhance your design message.',
      example: 'Hero images, product photos, lifestyle photography, stock image selection',
      icon: Image
    },
    {
      id: '24',
      title: 'Illustration Styles',
      category: 'Imagery & Visuals',
      description: 'Choose appropriate illustration approaches: realistic, abstract, minimalist, hand-drawn, digital, or vector styles.',
      example: 'Brand mascots, icon systems, editorial illustrations, technical diagrams',
      icon: Lightbulb
    },
    {
      id: '25',
      title: 'Iconography & Symbolism',
      category: 'Imagery & Visuals',
      description: 'Use universally recognized symbols and create consistent iconography to communicate quickly and clearly.',
      example: 'UI icons, wayfinding systems, infographic elements, app interfaces',
      icon: Sparkles
    },

    // Branding & Identity
    {
      id: '26',
      title: 'Logo Design Principles',
      category: 'Branding & Identity',
      description: 'Create memorable, scalable, and appropriate logos using simplicity, relevance, timelessness, and versatility.',
      example: 'Corporate logos, app icons, personal brands, product marks',
      icon: Briefcase
    },
    {
      id: '27',
      title: 'Brand Guidelines',
      category: 'Branding & Identity',
      description: 'Develop comprehensive style guides covering typography, colors, logos, imagery, and voice for consistent brand application.',
      example: 'Corporate identity systems, startup branding, product packaging',
      icon: Briefcase
    },

    // UX & UI Basics
    {
      id: '28',
      title: 'Human-Centered Design',
      category: 'UX & UI Basics',
      description: 'Design with user needs, behaviors, and limitations as the primary focus, ensuring accessibility and usability.',
      example: 'User research, persona development, accessibility compliance, user testing',
      icon: Users
    },
    {
      id: '29',
      title: 'Accessibility & Inclusive Design',
      category: 'UX & UI Basics',
      description: 'Create designs that work for users with diverse abilities, following WCAG guidelines for color contrast, navigation, and interaction.',
      example: 'Color contrast ratios, keyboard navigation, screen reader compatibility',
      icon: Users
    },
    {
      id: '30',
      title: 'Usability Principles',
      category: 'UX & UI Basics',
      description: 'Apply fundamental usability heuristics: consistency, error prevention, recognition over recall, and user control.',
      example: 'Interface design, form layouts, navigation systems, error handling',
      icon: Monitor
    },

    // Digital Design Fundamentals
    {
      id: '31',
      title: 'Raster vs. Vector Graphics',
      category: 'Digital Design',
      description: 'Understand when to use pixel-based raster images vs. scalable vector graphics for optimal quality and file size.',
      example: 'Logos (vector), photos (raster), icons (vector), textures (raster)',
      icon: Code
    },
    {
      id: '32',
      title: 'Resolution (DPI, PPI)',
      category: 'Digital Design',
      description: 'Master resolution requirements: 72 PPI for web, 300 DPI for print, and high-DPI considerations for modern devices.',
      example: 'Web graphics, print materials, retina displays, mobile apps',
      icon: Monitor
    },
    {
      id: '33',
      title: 'Responsive Design Basics',
      category: 'Digital Design',
      description: 'Create designs that adapt gracefully across different screen sizes using flexible grids, images, and media queries.',
      example: 'Mobile-first design, breakpoint planning, flexible layouts',
      icon: Monitor
    },

    // Design Tools & Software
    {
      id: '34',
      title: 'Adobe Creative Suite',
      category: 'Design Tools',
      description: 'Master industry-standard tools: Photoshop for photos, Illustrator for vectors, InDesign for layouts, After Effects for motion.',
      example: 'Photo editing, logo design, magazine layouts, motion graphics',
      icon: Cpu
    },
    {
      id: '35',
      title: 'Figma / Sketch / XD for UI/UX',
      category: 'Design Tools',
      description: 'Use collaborative design tools for creating user interfaces, prototypes, and design systems with team collaboration features.',
      example: 'App wireframes, website mockups, design systems, prototyping',
      icon: Monitor
    },

    // Visual Communication
    {
      id: '36',
      title: 'Gestalt Principles',
      category: 'Visual Communication',
      description: 'Apply psychology of perception: proximity (grouping), similarity (connection), closure (completion), continuity (flow).',
      example: 'Interface grouping, logo design, information architecture, visual flow',
      icon: Lightbulb
    },
    {
      id: '37',
      title: 'Storytelling Through Design',
      category: 'Visual Communication',
      description: 'Craft compelling narratives using visual elements, sequence, emotion, and user journey to engage and persuade.',
      example: 'Brand campaigns, user onboarding, product presentations, editorial design',
      icon: Lightbulb
    },

    // Modern Trends
    {
      id: '38',
      title: 'Glassmorphism',
      category: 'Modern Trends',
      description: 'Create depth with translucent surfaces, subtle borders, and backdrop blur effects for modern, premium aesthetics.',
      example: 'UI cards, overlays, navigation bars, modal dialogs',
      icon: Sparkles
    },
    {
      id: '39',
      title: 'Motion & Interactive Graphics',
      category: 'Modern Trends',
      description: 'Enhance user experience with purposeful animations, micro-interactions, and dynamic visual feedback.',
      example: 'Button hovers, loading states, page transitions, scroll animations',
      icon: Zap
    },
    {
      id: '40',
      title: 'AI in Design',
      category: 'Modern Trends',
      description: 'Leverage artificial intelligence for design automation, content generation, and creative assistance while maintaining human creativity.',
      example: 'AI image generation, automated layouts, color palette generation, content optimization',
      icon: Cpu
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
      case 'Design Principles': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Color Fundamentals': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Typography': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Layout & Composition': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Imagery & Visuals': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Branding & Identity': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'UX & UI Basics': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Digital Design': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'Design Tools': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Visual Communication': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'Print & Production': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'Modern Trends': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
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
            <span className="font-medium">Design Fundamentals</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Master the
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Fundamentals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guide to design principles, color theory, typography, and modern trends
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-card max-w-6xl mx-auto">
            <div className="flex flex-col gap-6">
              {/* Search Input */}
              <div className="relative">
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
                className="parallax-card group cursor-pointer hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
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