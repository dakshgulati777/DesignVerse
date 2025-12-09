import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, ArrowLeft, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
];

const FontLab = memo(() => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extended font collection with categories
  const allFonts: Font[] = [
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
    
    // Monospace
    { name: 'Source Code Pro', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Roboto Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Fira Code', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'JetBrains Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Space Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'IBM Plex Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Courier Prime', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Inconsolata', category: 'Monospace', variants: ['regular', '700'] },
    
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
    
    // Gothic
    { name: 'UnifrakturMaguntia', category: 'Gothic', variants: ['regular'] },
    { name: 'IM Fell English', category: 'Gothic', variants: ['regular'] },
    { name: 'Almendra', category: 'Gothic', variants: ['regular', '700'] },
    { name: 'Pirata One', category: 'Gothic', variants: ['regular'] },
    { name: 'Metal Mania', category: 'Gothic', variants: ['regular'] },
    { name: 'Creepster', category: 'Gothic', variants: ['regular'] },
    { name: 'Nosifer', category: 'Gothic', variants: ['regular'] },
    
    // Retro
    { name: 'Orbitron', category: 'Retro', variants: ['regular', '700'] },
    { name: 'Press Start 2P', category: 'Retro', variants: ['regular'] },
    { name: 'VT323', category: 'Retro', variants: ['regular'] },
    { name: 'Silkscreen', category: 'Retro', variants: ['regular', '700'] },
    { name: 'DotGothic16', category: 'Retro', variants: ['regular'] },
    { name: 'Major Mono Display', category: 'Retro', variants: ['regular'] },
    { name: 'Nova Mono', category: 'Retro', variants: ['regular'] },
    { name: 'Share Tech Mono', category: 'Retro', variants: ['regular'] },
  ];

  const filteredFonts = allFonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || font.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
              <h1 className="text-2xl font-bold">Font Lab</h1>
              <p className="text-sm text-muted-foreground">{filteredFonts.length} Professional Fonts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filter */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
          {filteredFonts.map((font, index) => (
            <motion.div
              key={font.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(index * 0.01, 0.3) }}
            >
              <Card className="glass-card group hover:shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300">
                <div className="text-center space-y-3">
                  <div className="bg-background/30 rounded-lg p-6 mb-2 transition-colors group-hover:bg-background/50">
                    <p 
                      className="text-5xl font-bold text-foreground transition-transform group-hover:scale-110"
                      style={{ fontFamily: `'${font.name}', sans-serif` }}
                    >
                      Aa
                    </p>
                    <p 
                      className="text-sm text-muted-foreground mt-3"
                      style={{ fontFamily: `'${font.name}', sans-serif` }}
                    >
                      Design
                    </p>
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
          ))}
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

      {/* Load Google Fonts for preview - optimized with subset */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link 
        href={`https://fonts.googleapis.com/css2?${filteredFonts.slice(0, 50).map(f => `family=${f.name.replace(/ /g, '+')}`).join('&')}&display=swap`}
        rel="stylesheet" 
      />
    </div>
  );
});

FontLab.displayName = 'FontLab';

export default FontLab;