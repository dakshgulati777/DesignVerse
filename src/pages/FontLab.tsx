import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, ArrowLeft } from 'lucide-react';
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

const FontLab = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // 100+ Google Fonts collection
  const allFonts: Font[] = [
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
    { name: 'Nunito Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Karla', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Fira Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Manrope', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'DM Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Space Grotesk', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Lexend', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Plus Jakarta Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Mulish', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Archivo', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'IBM Plex Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Heebo', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Asap', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Barlow', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Hind', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Outfit', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Maven Pro', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Merriweather', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Playfair Display', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Lora', category: 'Serif', variants: ['regular', '700'] },
    { name: 'PT Serif', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Crimson Text', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Libre Baskerville', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Cormorant Garamond', category: 'Serif', variants: ['regular', '700'] },
    { name: 'EB Garamond', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Bitter', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Cardo', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Spectral', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Zilla Slab', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Alegreya', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Rokkitt', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Vollkorn', category: 'Serif', variants: ['regular', '700'] },
    { name: 'Abril Fatface', category: 'Display', variants: ['regular'] },
    { name: 'Bebas Neue', category: 'Display', variants: ['regular'] },
    { name: 'Righteous', category: 'Display', variants: ['regular'] },
    { name: 'Pacifico', category: 'Display', variants: ['regular'] },
    { name: 'Lobster', category: 'Display', variants: ['regular'] },
    { name: 'Fredoka One', category: 'Display', variants: ['regular'] },
    { name: 'Alfa Slab One', category: 'Display', variants: ['regular'] },
    { name: 'Bungee', category: 'Display', variants: ['regular'] },
    { name: 'Permanent Marker', category: 'Display', variants: ['regular'] },
    { name: 'Satisfy', category: 'Display', variants: ['regular'] },
    { name: 'Shadows Into Light', category: 'Display', variants: ['regular'] },
    { name: 'Amatic SC', category: 'Display', variants: ['regular', '700'] },
    { name: 'Anton', category: 'Display', variants: ['regular'] },
    { name: 'Cinzel', category: 'Display', variants: ['regular', '700'] },
    { name: 'Yeseva One', category: 'Display', variants: ['regular'] },
    { name: 'Architects Daughter', category: 'Handwriting', variants: ['regular'] },
    { name: 'Dancing Script', category: 'Handwriting', variants: ['regular', '700'] },
    { name: 'Caveat', category: 'Handwriting', variants: ['regular', '700'] },
    { name: 'Cookie', category: 'Handwriting', variants: ['regular'] },
    { name: 'Great Vibes', category: 'Handwriting', variants: ['regular'] },
    { name: 'Kaushan Script', category: 'Handwriting', variants: ['regular'] },
    { name: 'Indie Flower', category: 'Handwriting', variants: ['regular'] },
    { name: 'Patrick Hand', category: 'Handwriting', variants: ['regular'] },
    { name: 'Source Code Pro', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Roboto Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Fira Code', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'JetBrains Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Courier Prime', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'Space Mono', category: 'Monospace', variants: ['regular', '700'] },
    { name: 'PT Mono', category: 'Monospace', variants: ['regular'] },
    { name: 'Source Sans Pro', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Oswald', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'PT Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Noto Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Titillium Web', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Exo 2', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Cabin', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Varela Round', category: 'Sans Serif', variants: ['regular'] },
    { name: 'Abel', category: 'Sans Serif', variants: ['regular'] },
    { name: 'Oxygen', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Prompt', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Catamaran', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Yanone Kaffeesatz', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Dosis', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Comfortaa', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Cairo', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Encode Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Fjalla One', category: 'Sans Serif', variants: ['regular'] },
    { name: 'Almarai', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Kanit', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Signika', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Public Sans', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Red Hat Display', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Sora', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Urbanist', category: 'Sans Serif', variants: ['regular', '700'] },
    { name: 'Instrument Sans', category: 'Sans Serif', variants: ['regular', '700'] },
  ];

  const filteredFonts = allFonts.filter(font =>
    font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    font.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadFont = async (fontName: string) => {
    try {
      // Create a Google Fonts CSS URL
      const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
      
      // Fetch the CSS file
      const response = await fetch(fontUrl);
      const cssText = await response.text();
      
      // Extract font URLs from CSS
      const urlMatches = cssText.match(/url\((https:\/\/[^)]+)\)/g);
      
      if (urlMatches && urlMatches.length > 0) {
        // Download the first font file
        const fontFileUrl = urlMatches[0].match(/https:\/\/[^)]+/)?.[0];
        
        if (fontFileUrl) {
          const fontResponse = await fetch(fontFileUrl);
          const fontBlob = await fontResponse.blob();
          
          // Create download link
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
        // Fallback: Open Google Fonts page
        window.open(`https://fonts.google.com/specimen/${fontName.replace(/ /g, '+')}`, '_blank');
        toast.info(`Opening ${fontName} download page...`);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error(`Failed to download ${fontName}. Please try again.`);
    }
  };

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
              <p className="text-sm text-muted-foreground">100+ Professional Fonts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
          <p className="text-center text-sm text-muted-foreground mt-4">
            {filteredFonts.length} fonts available
          </p>
        </motion.div>

        {/* Fonts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFonts.map((font, index) => (
            <motion.div
              key={font.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
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
                    <p className="text-xs text-muted-foreground">{font.category}</p>
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
            <p className="text-xl text-muted-foreground">No fonts found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Load Google Fonts for preview */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link 
        href={`https://fonts.googleapis.com/css2?${allFonts.map(f => `family=${f.name.replace(/ /g, '+')}:wght@400;700`).join('&')}&display=swap`}
        rel="stylesheet" 
      />
    </div>
  );
};

export default FontLab;
