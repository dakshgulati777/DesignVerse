import { useState, useCallback, memo, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Search, ArrowLeft, Heart, Type, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';

interface Font {
  name: string;
  category: string;
  variants: string[];
  mood: string[];
}

const moodTags = [
  'All', 'Modern', 'Elegant', 'Playful', 'Professional', 'Bold', 'Minimal',
  'Creative', 'Vintage', 'Friendly', 'Technical', 'Warm', 'Sharp', 'Luxury',
];

const FontLab = memo(() => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('All');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const allFonts: Font[] = useMemo(() => [
    { name: 'Roboto', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Professional', 'Minimal'] },
    { name: 'Open Sans', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Professional', 'Friendly', 'Warm'] },
    { name: 'Lato', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Professional', 'Warm'] },
    { name: 'Montserrat', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Bold', 'Creative'] },
    { name: 'Poppins', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Friendly', 'Playful'] },
    { name: 'Inter', category: 'Sans Serif', variants: ['regular', '600'], mood: ['Modern', 'Minimal', 'Professional'] },
    { name: 'Raleway', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Elegant', 'Modern', 'Minimal'] },
    { name: 'Ubuntu', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Friendly', 'Technical', 'Modern'] },
    { name: 'Nunito', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Friendly', 'Playful', 'Warm'] },
    { name: 'Work Sans', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Professional', 'Modern', 'Minimal'] },
    { name: 'Quicksand', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Playful', 'Friendly', 'Modern'] },
    { name: 'DM Sans', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Minimal', 'Sharp'] },
    { name: 'Space Grotesk', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Technical', 'Modern', 'Sharp'] },
    { name: 'Manrope', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Professional', 'Warm'] },
    { name: 'Outfit', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Creative', 'Friendly'] },
    { name: 'Urbanist', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Minimal', 'Elegant'] },
    { name: 'Plus Jakarta Sans', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Professional', 'Warm'] },
    { name: 'Lexend', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Professional', 'Friendly', 'Modern'] },
    { name: 'Figtree', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Friendly', 'Modern', 'Warm'] },
    { name: 'Sora', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Modern', 'Technical', 'Sharp'] },
    { name: 'Merriweather', category: 'Serif', variants: ['regular', '700'], mood: ['Elegant', 'Professional', 'Warm'] },
    { name: 'Playfair Display', category: 'Serif', variants: ['regular', '700'], mood: ['Elegant', 'Luxury', 'Vintage'] },
    { name: 'Lora', category: 'Serif', variants: ['regular', '700'], mood: ['Elegant', 'Warm', 'Vintage'] },
    { name: 'PT Serif', category: 'Serif', variants: ['regular', '700'], mood: ['Professional', 'Elegant', 'Vintage'] },
    { name: 'Cormorant Garamond', category: 'Serif', variants: ['regular', '700'], mood: ['Luxury', 'Elegant', 'Vintage'] },
    { name: 'EB Garamond', category: 'Serif', variants: ['regular', '700'], mood: ['Elegant', 'Vintage', 'Professional'] },
    { name: 'Bodoni Moda', category: 'Serif', variants: ['regular', '700'], mood: ['Luxury', 'Elegant', 'Bold'] },
    { name: 'Fraunces', category: 'Serif', variants: ['regular', '700'], mood: ['Creative', 'Warm', 'Playful'] },
    { name: 'Spectral', category: 'Serif', variants: ['regular', '700'], mood: ['Elegant', 'Professional', 'Minimal'] },
    { name: 'Libre Baskerville', category: 'Serif', variants: ['regular', '700'], mood: ['Professional', 'Elegant', 'Vintage'] },
    { name: 'Bebas Neue', category: 'Display', variants: ['regular'], mood: ['Bold', 'Creative', 'Sharp'] },
    { name: 'Anton', category: 'Display', variants: ['regular'], mood: ['Bold', 'Sharp', 'Modern'] },
    { name: 'Abril Fatface', category: 'Display', variants: ['regular'], mood: ['Elegant', 'Bold', 'Vintage'] },
    { name: 'Cinzel', category: 'Display', variants: ['regular', '700'], mood: ['Luxury', 'Elegant', 'Vintage'] },
    { name: 'Oswald', category: 'Display', variants: ['regular', '700'], mood: ['Bold', 'Modern', 'Sharp'] },
    { name: 'Righteous', category: 'Display', variants: ['regular'], mood: ['Playful', 'Bold', 'Creative'] },
    { name: 'Alfa Slab One', category: 'Display', variants: ['regular'], mood: ['Bold', 'Vintage', 'Sharp'] },
    { name: 'Teko', category: 'Display', variants: ['regular', '700'], mood: ['Technical', 'Bold', 'Sharp'] },
    { name: 'Russo One', category: 'Display', variants: ['regular'], mood: ['Bold', 'Technical', 'Sharp'] },
    { name: 'Archivo Black', category: 'Display', variants: ['regular'], mood: ['Bold', 'Modern', 'Creative'] },
    { name: 'Dancing Script', category: 'Handwriting', variants: ['regular', '700'], mood: ['Elegant', 'Playful', 'Warm'] },
    { name: 'Caveat', category: 'Handwriting', variants: ['regular', '700'], mood: ['Friendly', 'Playful', 'Warm'] },
    { name: 'Great Vibes', category: 'Handwriting', variants: ['regular'], mood: ['Luxury', 'Elegant', 'Warm'] },
    { name: 'Pacifico', category: 'Handwriting', variants: ['regular'], mood: ['Playful', 'Friendly', 'Creative'] },
    { name: 'Sacramento', category: 'Handwriting', variants: ['regular'], mood: ['Elegant', 'Warm', 'Luxury'] },
    { name: 'Source Code Pro', category: 'Monospace', variants: ['regular', '700'], mood: ['Technical', 'Professional', 'Minimal'] },
    { name: 'Fira Code', category: 'Monospace', variants: ['regular', '700'], mood: ['Technical', 'Modern', 'Sharp'] },
    { name: 'JetBrains Mono', category: 'Monospace', variants: ['regular', '700'], mood: ['Technical', 'Professional', 'Modern'] },
    { name: 'Space Mono', category: 'Monospace', variants: ['regular', '700'], mood: ['Technical', 'Creative', 'Vintage'] },
    { name: 'Roboto Mono', category: 'Monospace', variants: ['regular', '700'], mood: ['Technical', 'Professional', 'Minimal'] },
    { name: 'Orbitron', category: 'Display', variants: ['regular', '700'], mood: ['Technical', 'Bold', 'Creative'] },
    { name: 'Press Start 2P', category: 'Display', variants: ['regular'], mood: ['Playful', 'Bold', 'Vintage'] },
    { name: 'Bangers', category: 'Display', variants: ['regular'], mood: ['Bold', 'Playful', 'Creative'] },
    { name: 'Permanent Marker', category: 'Display', variants: ['regular'], mood: ['Creative', 'Playful', 'Bold'] },
    { name: 'Lobster', category: 'Display', variants: ['regular'], mood: ['Playful', 'Creative', 'Warm'] },
    { name: 'Comfortaa', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Friendly', 'Playful', 'Modern'] },
    { name: 'Josefin Sans', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Elegant', 'Minimal', 'Modern'] },
    { name: 'Rubik', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Friendly', 'Modern', 'Playful'] },
    { name: 'Rajdhani', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Technical', 'Sharp', 'Modern'] },
    { name: 'Exo 2', category: 'Sans Serif', variants: ['regular', '700'], mood: ['Technical', 'Modern', 'Sharp'] },
  ], []);

  const filteredFonts = useMemo(() => allFonts.filter(font => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query ||
      font.name.toLowerCase().includes(query) ||
      font.category.toLowerCase().includes(query) ||
      font.mood.some(m => m.toLowerCase().includes(query));
    const matchesMood = selectedMood === 'All' || font.mood.includes(selectedMood);
    return matchesSearch && matchesMood;
  }), [allFonts, searchQuery, selectedMood]);

  useEffect(() => {
    const fontFamilies = filteredFonts.slice(0, 40).map(f => f.name.replace(/ /g, '+')).join('&family=');
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
          toast.success(`${fontName} downloaded!`);
        }
      } else {
        toast.info(`Search for "${fontName}" online to download.`);
      }
    } catch {
      toast.error(`Failed to download ${fontName}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Type className="w-6 h-6" />
                  Font Lab
                </h1>
                <p className="text-sm text-muted-foreground">{filteredFonts.length} fonts</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/font-playground')}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Playground
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, category, or mood (e.g. elegant, bold, playful)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-card border-border"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mood Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {moodTags.map((mood) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood(mood)}
                className={`text-xs transition-all duration-200 ${
                  selectedMood === mood
                    ? 'bg-foreground text-background'
                    : 'border-border hover:border-foreground/40'
                }`}
              >
                {mood}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Font List - Fontshare style */}
        <div className="divide-y divide-border">
          <AnimatePresence mode="popLayout">
            {filteredFonts.map((font, index) => {
              const fontIsFavorite = isFavorite('font', font.name);
              return (
                <motion.div
                  key={font.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
                  className="group py-6 md:py-10"
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground">{font.name}</span>
                      <button
                        onClick={() => fontIsFavorite
                          ? removeFavorite('font', font.name)
                          : addFavorite('font', font.name, font)
                        }
                        className="p-1"
                        aria-label={fontIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${fontIsFavorite ? 'fill-primary text-primary' : 'text-muted-foreground/40 hover:text-muted-foreground'} transition-colors`} />
                      </button>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <span className="hidden sm:inline">{font.variants.length} styles</span>
                      <span className="hidden sm:inline">Free</span>
                      <button
                        onClick={() => downloadFont(font.name)}
                        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>

                  {/* Large font name */}
                  <div className="overflow-hidden">
                    <h2
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[110px] font-normal leading-[0.95] tracking-tight text-primary/80 group-hover:text-foreground transition-colors duration-500 cursor-default select-none"
                      style={{ fontFamily: `'${font.name}', sans-serif` }}
                    >
                      {font.name}
                    </h2>
                  </div>

                  {/* Bottom row */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground/50">{font.category}</span>
                      <span className="text-muted-foreground/20">·</span>
                      {font.mood.slice(0, 3).map(m => (
                        <span
                          key={m}
                          className="text-[10px] px-1.5 py-0.5 border border-border rounded text-muted-foreground/50"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <div className="w-12 h-[1px] bg-muted-foreground/10 group-hover:w-20 group-hover:bg-primary/30 transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredFonts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No fonts found</p>
            <p className="text-sm text-muted-foreground/60 mt-2">Try a different mood or search term</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => { setSearchQuery(''); setSelectedMood('All'); }}
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
