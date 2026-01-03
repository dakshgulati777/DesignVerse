import { useState, useCallback, memo, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, ArrowLeft, Heart, Type, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';

interface Font {
  name: string;
  category: string;
  variants: string[];
}

const fontCategories = [
  'All',
  'Sans Serif',
  'Serif',
  'Display',
  'Handwriting',
  'Monospace',
  'Cartoon',
  'Decorative',
  'Gothic',
  'Retro',
  'Bold',
  'Condensed',
  'Rounded',
  'Elegant',
  'Tech',
  'Script',
  'Slab Serif',
  'Geometric',
];

const FontLab = memo(() => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewText, setPreviewText] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Extended font collection with categories - 250+ fonts
  const allFonts: Font[] = useMemo(() => [
    // Sans Serif
    { name: 'Roboto', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Open Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Lato', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Montserrat', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Poppins', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Inter', category: 'Sans Serif', variants: ['regular', '600'] },
    { name: 'Raleway', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Ubuntu', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Nunito', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Work Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Rubik', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Quicksand', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Josefin Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'DM Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Space Grotesk', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Manrope', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Outfit', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Urbanist', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Plus Jakarta Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Lexend', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Figtree', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Sora', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Archivo', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Red Hat Display', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Albert Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    
    // Serif
    { name: 'Merriweather', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Playfair Display', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Lora', category: 'Serif', variants: ['regular', '700'] },
    { name: 'PT Serif', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Crimson Text', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Libre Baskerville', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Cormorant Garamond', category: 'Serif', variants: ['regular', '700'] },
    { name: 'EB Garamond', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Spectral', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Bodoni Moda', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Fraunces', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Alegreya', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Bitter', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Vollkorn', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Noto Serif', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Source Serif Pro', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Literata', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Newsreader', category: 'Serif', variants: ['regular', '700'] },
    
    // Display
    { name: 'Abril Fatface', category: 'Display', variants: ['regular'] },
    { name: 'Bebas Neue', category: 'Display', variants: ['regular'] },
    { name: 'Righteous', category: 'Display', variants: ['regular'] },
    { name: 'Anton', category: 'Display', variants: ['regular'] },
    { name: 'Cinzel', category: 'Display', variants: ['regular', '700'] },
    { name: 'Oswald', category: 'Display', variants: ['regular', '700'] },
    { name: 'Alfa Slab One', category: 'Display', variants: ['regular'] },
    { name: 'Bungee', category: 'Display', variants: ['regular'] },
    { name: 'Teko', category: 'Display', variants: ['regular', '700'] },
    { name: 'Russo One', category: 'Display', variants: ['regular'] },
    { name: 'Staatliches', category: 'Display', variants: ['regular'] },
    { name: 'Archivo Black', category: 'Display', variants: ['regular'] },
    { name: 'Big Shoulders Display', category: 'Display', variants: ['regular', '700'] },
    { name: 'Dela Gothic One', category: 'Display', variants: ['regular'] },
    
    // Handwriting
    { name: 'Dancing Script', category: 'Handwriting', variants: ['regular', '700'] },
    { name: 'Caveat', category: 'Handwriting', variants: ['regular', '700'] },
    { name: 'Great Vibes', category: 'Handwriting', variants: ['regular'] },
    { name: 'Kaushan Script', category: 'Handwriting', variants: ['regular'] },
    { name: 'Indie Flower', category: 'Handwriting', variants: ['regular'] },
    { name: 'Patrick Hand', category: 'Handwriting', variants: ['regular'] },
    { name: 'Architects Daughter', category: 'Handwriting', variants: ['regular'] },
    { name: 'Sacramento', category: 'Handwriting', variants: ['regular'] },
    { name: 'Shadows Into Light', category: 'Handwriting', variants: ['regular'] },
    { name: 'Alex Brush', category: 'Handwriting', variants: ['regular'] },
    { name: 'Handlee', category: 'Handwriting', variants: ['regular'] },
    { name: 'Gochi Hand', category: 'Handwriting', variants: ['regular'] },
    { name: 'Kalam', category: 'Handwriting', variants: ['regular', '700'] },
    { name: 'Nanum Pen Script', category: 'Handwriting', variants: ['regular'] },
    { name: 'Reenie Beanie', category: 'Handwriting', variants: ['regular'] },
    
    // Monospace
    { name: 'Source Code Pro', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Roboto Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Fira Code', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'JetBrains Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Space Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'IBM Plex Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Courier Prime', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Inconsolata', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Anonymous Pro', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Ubuntu Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Overpass Mono', category: 'Monospace', variants: ['regular', '700'] },
    
    // Cartoon
    { name: 'Bangers', category: 'Cartoon', variants: ['regular'] },
    { name: 'Permanent Marker', category: 'Cartoon', variants: ['regular'] },
    { name: 'Fredoka One', category: 'Cartoon', variants: ['regular'] },
    { name: 'Bubblegum Sans', category: 'Cartoon', variants: ['regular'] },
    { name: 'Comic Neue', category: 'Cartoon', variants: ['regular', '700'] },
    { name: 'Boogaloo', category: 'Cartoon', variants: ['regular'] },
    { name: 'Chewy', category: 'Cartoon', variants: ['regular'] },
    { name: 'Luckiest Guy', category: 'Cartoon', variants: ['regular'] },
    { name: 'Titan One', category: 'Cartoon', variants: ['regular'] },
    { name: 'Bowlby One SC', category: 'Cartoon', variants: ['regular'] },
    { name: 'Cherry Bomb One', category: 'Cartoon', variants: ['regular'] },
    { name: 'Londrina Solid', category: 'Cartoon', variants: ['regular'] },
    
    // Decorative
    { name: 'Lobster', category: 'Decorative', variants: ['regular'] },
    { name: 'Pacifico', category: 'Decorative', variants: ['regular'] },
    { name: 'Satisfy', category: 'Decorative', variants: ['regular'] },
    { name: 'Cookie', category: 'Decorative', variants: ['regular'] },
    { name: 'Amatic SC', category: 'Decorative', variants: ['regular', '700'] },
    { name: 'Yeseva One', category: 'Decorative', variants: ['regular'] },
    { name: 'Monoton', category: 'Decorative', variants: ['regular'] },
    { name: 'Fascinate Inline', category: 'Decorative', variants: ['regular'] },
    { name: 'Shrikhand', category: 'Decorative', variants: ['regular'] },
    { name: 'Rye', category: 'Decorative', variants: ['regular'] },
    { name: 'Bungee Shade', category: 'Decorative', variants: ['regular'] },
    { name: 'Rampart One', category: 'Decorative', variants: ['regular'] },
    
    // Gothic
    { name: 'UnifrakturMaguntia', category: 'Gothic', variants: ['regular'] },
    { name: 'IM Fell English', category: 'Gothic', variants: ['regular'] },
    { name: 'Almendra', category: 'Gothic', variants: ['regular', '700'] },
    { name: 'Pirata One', category: 'Gothic', variants: ['regular'] },
    { name: 'Metal Mania', category: 'Gothic', variants: ['regular'] },
    { name: 'Creepster', category: 'Gothic', variants: ['regular'] },
    { name: 'Nosifer', category: 'Gothic', variants: ['regular'] },
    { name: 'Eater', category: 'Gothic', variants: ['regular'] },
    { name: 'Butcherman', category: 'Gothic', variants: ['regular'] },
    
    // Retro
    { name: 'Orbitron', category: 'Retro', variants: ['regular', '700'] },
    { name: 'Press Start 2P', category: 'Retro', variants: ['regular'] },
    { name: 'VT323', category: 'Retro', variants: ['regular'] },
    { name: 'Silkscreen', category: 'Retro', variants: ['regular', '700'] },
    { name: 'DotGothic16', category: 'Retro', variants: ['regular'] },
    { name: 'Major Mono Display', category: 'Retro', variants: ['regular'] },
    { name: 'Nova Mono', category: 'Retro', variants: ['regular'] },
    { name: 'Share Tech Mono', category: 'Retro', variants: ['regular'] },
    { name: 'Special Elite', category: 'Retro', variants: ['regular'] },
    { name: 'Cutive Mono', category: 'Retro', variants: ['regular'] },
    
    // Bold
    { name: 'Black Ops One', category: 'Bold', variants: ['regular'] },
    { name: 'Bungee Inline', category: 'Bold', variants: ['regular'] },
    { name: 'Impact', category: 'Bold', variants: ['regular'] },
    { name: 'Ultra', category: 'Bold', variants: ['regular'] },
    { name: 'Passion One', category: 'Bold', variants: ['regular', '700'] },
    { name: 'Fugaz One', category: 'Bold', variants: ['regular'] },
    { name: 'Changa One', category: 'Bold', variants: ['regular'] },
    { name: 'Bevan', category: 'Bold', variants: ['regular'] },
    { name: 'Bree Serif', category: 'Bold', variants: ['regular'] },
    { name: 'Lilita One', category: 'Bold', variants: ['regular'] },
    { name: 'Carter One', category: 'Bold', variants: ['regular'] },
    
    // Condensed
    { name: 'Roboto Condensed', category: 'Condensed', variants: ['regular', '700'] },
    { name: 'Barlow Condensed', category: 'Condensed', variants: ['regular', '700'] },
    { name: 'Saira Condensed', category: 'Condensed', variants: ['regular', '700'] },
    { name: 'PT Sans Narrow', category: 'Condensed', variants: ['regular', '700'] },
    { name: 'Encode Sans Condensed', category: 'Condensed', variants: ['regular', '700'] },
    { name: 'Fjalla One', category: 'Condensed', variants: ['regular'] },
    { name: 'Pathway Gothic One', category: 'Condensed', variants: ['regular'] },
    { name: 'Oswald', category: 'Condensed', variants: ['regular', '700'] },
    { name: 'Antonio', category: 'Condensed', variants: ['regular', '700'] },
    
    // Rounded
    { name: 'Varela Round', category: 'Rounded', variants: ['regular'] },
    { name: 'Comfortaa', category: 'Rounded', variants: ['regular', '700'] },
    { name: 'M PLUS Rounded 1c', category: 'Rounded', variants: ['regular', '700'] },
    { name: 'Baloo 2', category: 'Rounded', variants: ['regular', '700'] },
    { name: 'Andika', category: 'Rounded', variants: ['regular', '700'] },
    { name: 'Sniglet', category: 'Rounded', variants: ['regular', '700'] },
    { name: 'Delius', category: 'Rounded', variants: ['regular'] },
    
    // Elegant
    { name: 'Marcellus', category: 'Elegant', variants: ['regular'] },
    { name: 'Cormorant', category: 'Elegant', variants: ['regular', '700'] },
    { name: 'Forum', category: 'Elegant', variants: ['regular'] },
    { name: 'Poiret One', category: 'Elegant', variants: ['regular'] },
    { name: 'Didact Gothic', category: 'Elegant', variants: ['regular'] },
    { name: 'Jura', category: 'Elegant', variants: ['regular', '700'] },
    { name: 'Tenor Sans', category: 'Elegant', variants: ['regular'] },
    { name: 'Sorts Mill Goudy', category: 'Elegant', variants: ['regular'] },
    { name: 'Gilda Display', category: 'Elegant', variants: ['regular'] },
    { name: 'Oranienbaum', category: 'Elegant', variants: ['regular'] },
    
    // Tech
    { name: 'Rajdhani', category: 'Tech', variants: ['regular', '700'] },
    { name: 'Exo 2', category: 'Tech', variants: ['regular', '700'] },
    { name: 'Saira', category: 'Tech', variants: ['regular', '700'] },
    { name: 'Titillium Web', category: 'Tech', variants: ['regular', '700'] },
    { name: 'Oxanium', category: 'Tech', variants: ['regular', '700'] },
    { name: 'Michroma', category: 'Tech', variants: ['regular'] },
    { name: 'Audiowide', category: 'Tech', variants: ['regular'] },
    { name: 'Electrolize', category: 'Tech', variants: ['regular'] },
    { name: 'Chakra Petch', category: 'Tech', variants: ['regular', '700'] },
    { name: 'Syncopate', category: 'Tech', variants: ['regular', '700'] },
    { name: 'Iceland', category: 'Tech', variants: ['regular'] },
    { name: 'Quantico', category: 'Tech', variants: ['regular', '700'] },
    
    // Script
    { name: 'Parisienne', category: 'Script', variants: ['regular'] },
    { name: 'Allura', category: 'Script', variants: ['regular'] },
    { name: 'Tangerine', category: 'Script', variants: ['regular', '700'] },
    { name: 'Pinyon Script', category: 'Script', variants: ['regular'] },
    { name: 'Rochester', category: 'Script', variants: ['regular'] },
    { name: 'Niconne', category: 'Script', variants: ['regular'] },
    { name: 'Herr Von Muellerhoff', category: 'Script', variants: ['regular'] },
    { name: 'Marck Script', category: 'Script', variants: ['regular'] },
    { name: 'Petit Formal Script', category: 'Script', variants: ['regular'] },
    { name: 'Italianno', category: 'Script', variants: ['regular'] },
    
    // Slab Serif
    { name: 'Roboto Slab', category: 'Slab Serif', variants: ['regular', '700'] },
    { name: 'Arvo', category: 'Slab Serif', variants: ['regular', '700'] },
    { name: 'Zilla Slab', category: 'Slab Serif', variants: ['regular', '700'] },
    { name: 'Crete Round', category: 'Slab Serif', variants: ['regular'] },
    { name: 'Rokkitt', category: 'Slab Serif', variants: ['regular', '700'] },
    { name: 'Slabo 27px', category: 'Slab Serif', variants: ['regular'] },
    { name: 'Josefin Slab', category: 'Slab Serif', variants: ['regular', '700'] },
    { name: 'Patua One', category: 'Slab Serif', variants: ['regular'] },
    { name: 'Rockwell', category: 'Slab Serif', variants: ['regular', '700'] },
    
    // Geometric
    { name: 'Poppins', category: 'Geometric', variants: ['regular', '700'] },
    { name: 'Futura', category: 'Geometric', variants: ['regular', '700'] },
    { name: 'Century Gothic', category: 'Geometric', variants: ['regular', '700'] },
    { name: 'Comfortaa', category: 'Geometric', variants: ['regular', '700'] },
    { name: 'Questrial', category: 'Geometric', variants: ['regular'] },
    { name: 'Nunito Sans', category: 'Geometric', variants: ['regular', '700'] },
    { name: 'Muli', category: 'Geometric', variants: ['regular', '700'] },
    { name: 'Spartan', category: 'Geometric', variants: ['regular', '700'] },
    { name: 'Maven Pro', category: 'Geometric', variants: ['regular', '700'] },
    { name: 'Alata', category: 'Geometric', variants: ['regular'] },
  ], []);

  const filteredFonts = useMemo(() => allFonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || font.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [allFonts, searchQuery, selectedCategory]);

  // Load fonts dynamically
  useEffect(() => {
    const fontFamilies = filteredFonts.slice(0, 50).map(f => f.name.replace(/ /g, '+')).join('&family=');
    if (fontFamilies) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, [filteredFonts]);

  const downloadFont = useCallback(async (fontName: string) => {
    try {
      const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
      const response = await fetch(fontUrl);
      const cssText = await response.text();
      const urlMatches = cssText.match(/url\((https:\/\/[^)]+)\)/g);
      
      if (urlMatches && urlMatches.length > 0) {
        const fontFileUrl = urlMatches[0].match(/https:\/\/[^)]+/)?.[0];
        if (fontFileUrl) {
          const fontResponse = await fetch(fontFileUrl);
          const fontBlob = await fontResponse.blob();
          const url = window.URL.createObjectURL(fontBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${fontName.replace(/ /g, '-')}.woff2`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          toast.success(`${fontName} downloaded successfully!`);
        }
      } else {
        window.open(`https://fonts.google.com/specimen/${fontName.replace(/ /g, '+')}`, '_blank');
        toast.info(`Opening ${fontName} download page...`);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error(`Failed to download ${fontName}. Please try again.`);
    }
  }, []);

  const displayText = previewText || 'Aa';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Type className="w-6 h-6" />
                  Font Lab
                </h1>
                <p className="text-sm text-muted-foreground">{filteredFonts.length} Professional Fonts</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/font-playground')}
              className="bg-primary hover:bg-primary/90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Font Playground
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Custom Preview Text */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-xl mx-auto">
            <label className="text-sm text-muted-foreground mb-2 block text-center">
              Custom Preview Text
            </label>
            <Input
              type="text"
              placeholder="Type to preview fonts..."
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="text-center py-4 text-lg bg-background/50 border-white/20"
            />
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search fonts by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-background/50 border-white/20"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {fontCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Fonts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFonts.map((font, index) => {
            const fontIsFavorite = isFavorite('font', font.name);
            return (
              <motion.div
                key={font.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(index * 0.01, 0.3) }}
              >
                <Card className="glass-card group hover:shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300 relative">
                  <button
                    onClick={() => fontIsFavorite 
                      ? removeFavorite('font', font.name)
                      : addFavorite('font', font.name, font)
                    }
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors z-10"
                    aria-label={fontIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-4 h-4 ${fontIsFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                  </button>
                  <div className="text-center space-y-3">
                    <div className="bg-background/30 rounded-lg p-6 mb-2 transition-colors group-hover:bg-background/50 min-h-[120px] flex flex-col items-center justify-center">
                      <p 
                        className="text-4xl font-bold text-foreground transition-transform group-hover:scale-110 truncate max-w-full"
                        style={{ fontFamily: `'${font.name}', sans-serif` }}
                      >
                        {displayText}
                      </p>
                      {!previewText && (
                        <p 
                          className="text-sm text-muted-foreground mt-3"
                          style={{ fontFamily: `'${font.name}', sans-serif` }}
                        >
                          The quick brown fox
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{font.name}</p>
                      <p className="text-xs text-primary">{font.category}</p>
                    </div>
                    <Button 
                      onClick={() => downloadFont(font.name)}
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredFonts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No fonts found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

FontLab.displayName = 'FontLab';

export default FontLab;