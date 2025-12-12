import { useState, useEffect, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Type, Download, Sparkles, RefreshCw, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';

interface FontPairing {
  id: string;
  theme: string;
  heading: string;
  body: string;
  mood: string;
  description: string;
}

const FontSection = memo(() => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string>('modern');
  const [currentPairings, setCurrentPairings] = useState<FontPairing[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extended font pairings with more options
  const fontPairings: { [key: string]: FontPairing[] } = {
    modern: [
      { id: '1', theme: 'Modern Minimalist', heading: 'Montserrat', body: 'Open Sans', mood: 'modern', description: 'Clean, professional, and highly readable for tech and business' },
      { id: '2', theme: 'Modern Tech', heading: 'Inter', body: 'Roboto', mood: 'modern', description: 'Perfect for SaaS products and digital platforms' },
      { id: '3', theme: 'Modern Bold', heading: 'Poppins', body: 'Lato', mood: 'modern', description: 'Confident and contemporary with excellent legibility' },
      { id: '4', theme: 'Modern Clean', heading: 'DM Sans', body: 'Inter', mood: 'modern', description: 'Geometric precision for modern interfaces' },
      { id: '5', theme: 'Modern Edge', heading: 'Outfit', body: 'Plus Jakarta Sans', mood: 'modern', description: 'Fresh and distinctive for startups' },
      { id: '6', theme: 'Modern Geo', heading: 'Urbanist', body: 'Manrope', mood: 'modern', description: 'Geometric beauty with warm undertones' },
    ],
    elegant: [
      { id: '7', theme: 'Classic Elegance', heading: 'Playfair Display', body: 'Source Sans Pro', mood: 'elegant', description: 'Timeless sophistication for luxury brands' },
      { id: '8', theme: 'Refined Luxury', heading: 'Cormorant Garamond', body: 'Montserrat', mood: 'elegant', description: 'High-end editorial and fashion-forward designs' },
      { id: '9', theme: 'Sophisticated Style', heading: 'Merriweather', body: 'Open Sans', mood: 'elegant', description: 'Perfect balance of tradition and readability' },
      { id: '10', theme: 'French Chic', heading: 'Bodoni Moda', body: 'Raleway', mood: 'elegant', description: 'High fashion aesthetics with sophistication' },
      { id: '11', theme: 'Royal Touch', heading: 'Cinzel', body: 'EB Garamond', mood: 'elegant', description: 'Regal and commanding presence' },
      { id: '12', theme: 'Timeless Grace', heading: 'Libre Baskerville', body: 'Lora', mood: 'elegant', description: 'Classic book typography for premium content' },
    ],
    playful: [
      { id: '13', theme: 'Fun & Friendly', heading: 'Quicksand', body: 'Nunito', mood: 'playful', description: 'Warm and approachable for creative brands' },
      { id: '14', theme: 'Cheerful Vibes', heading: 'Pacifico', body: 'Raleway', mood: 'playful', description: 'Casual and energetic for lifestyle products' },
      { id: '15', theme: 'Creative Energy', heading: 'Righteous', body: 'Lato', mood: 'playful', description: 'Bold personality with balanced readability' },
      { id: '16', theme: 'Bouncy Joy', heading: 'Fredoka One', body: 'Nunito', mood: 'playful', description: 'Friendly and inviting for kids brands' },
      { id: '17', theme: 'Whimsical Touch', heading: 'Baloo 2', body: 'Quicksand', mood: 'playful', description: 'Rounded charm for casual apps' },
      { id: '18', theme: 'Happy Days', heading: 'Comfortaa', body: 'Varela Round', mood: 'playful', description: 'Soft curves for friendly interfaces' },
    ],
    professional: [
      { id: '19', theme: 'Corporate Classic', heading: 'Roboto', body: 'Roboto', mood: 'professional', description: 'Trusted and reliable for business communications' },
      { id: '20', theme: 'Executive Style', heading: 'Libre Baskerville', body: 'Source Sans Pro', mood: 'professional', description: 'Authoritative presence with modern accessibility' },
      { id: '21', theme: 'Professional Edge', heading: 'Work Sans', body: 'IBM Plex Sans', mood: 'professional', description: 'Contemporary professionalism for forward-thinking brands' },
      { id: '22', theme: 'Legal Authority', heading: 'PT Serif', body: 'PT Sans', mood: 'professional', description: 'Traditional trust for law and finance' },
      { id: '23', theme: 'Tech Professional', heading: 'IBM Plex Serif', body: 'IBM Plex Sans', mood: 'professional', description: 'Enterprise-ready typography system' },
      { id: '24', theme: 'Business Modern', heading: 'Lexend', body: 'Inter', mood: 'professional', description: 'Optimized readability for business docs' },
    ],
    creative: [
      { id: '25', theme: 'Artistic Expression', heading: 'Bebas Neue', body: 'Raleway', mood: 'creative', description: 'Bold statements with refined details' },
      { id: '26', theme: 'Design Studio', heading: 'Oswald', body: 'Open Sans', mood: 'creative', description: 'Strong hierarchy with versatile body text' },
      { id: '27', theme: 'Innovative Spirit', heading: 'Space Grotesk', body: 'Inter', mood: 'creative', description: 'Future-forward aesthetic with technical precision' },
      { id: '28', theme: 'Bold Vision', heading: 'Archivo Black', body: 'Archivo', mood: 'creative', description: 'Impactful headlines for creative agencies' },
      { id: '29', theme: 'Art Deco Revival', heading: 'Poiret One', body: 'Josefin Sans', mood: 'creative', description: 'Vintage glamour meets modern design' },
      { id: '30', theme: 'Studio Aesthetic', heading: 'Syne', body: 'Work Sans', mood: 'creative', description: 'Experimental typography for portfolios' },
    ],
    vintage: [
      { id: '31', theme: 'Retro Revival', heading: 'Abril Fatface', body: 'Lato', mood: 'vintage', description: 'Classic display with contemporary readability' },
      { id: '32', theme: 'Nostalgic Charm', heading: 'Cinzel', body: 'Crimson Text', mood: 'vintage', description: 'Historical elegance meets modern typography' },
      { id: '33', theme: 'Heritage Style', heading: 'Yeseva One', body: 'Josefin Sans', mood: 'vintage', description: 'Vintage personality with clean supporting text' },
      { id: '34', theme: 'Old Hollywood', heading: 'Playfair Display SC', body: 'Spectral', mood: 'vintage', description: 'Golden age glamour for luxury brands' },
      { id: '35', theme: 'Victorian Era', heading: 'Cardo', body: 'Alegreya', mood: 'vintage', description: 'Classic book typography revived' },
      { id: '36', theme: 'Art Nouveau', heading: 'Marcellus', body: 'Gentium Plus', mood: 'vintage', description: 'Ornate elegance for artisanal brands' },
    ],
    bold: [
      { id: '37', theme: 'Impact Statement', heading: 'Anton', body: 'Roboto', mood: 'bold', description: 'High-impact headlines with versatile body text' },
      { id: '38', theme: 'Strong Presence', heading: 'Black Ops One', body: 'Open Sans', mood: 'bold', description: 'Military-inspired boldness with friendly readability' },
      { id: '39', theme: 'Power Typography', heading: 'Russo One', body: 'Source Sans Pro', mood: 'bold', description: 'Geometric strength meets professional clarity' },
      { id: '40', theme: 'Maximum Impact', heading: 'Bungee', body: 'Roboto', mood: 'bold', description: 'Attention-grabbing for sports and gaming' },
      { id: '41', theme: 'Heavy Metal', heading: 'Teko', body: 'Barlow', mood: 'bold', description: 'Industrial strength for automotive brands' },
      { id: '42', theme: 'Street Style', heading: 'Bebas Neue', body: 'Roboto Condensed', mood: 'bold', description: 'Urban edge for streetwear and music' },
    ],
    minimal: [
      { id: '43', theme: 'Clean Canvas', heading: 'DM Sans', body: 'DM Sans', mood: 'minimal', description: 'Unified simplicity for minimalist designs' },
      { id: '44', theme: 'Swiss Style', heading: 'Helvetica Neue', body: 'Inter', mood: 'minimal', description: 'Timeless Swiss design principles' },
      { id: '45', theme: 'Pure Simplicity', heading: 'Karla', body: 'Karla', mood: 'minimal', description: 'Grotesque charm with consistent styling' },
      { id: '46', theme: 'Zen Typography', heading: 'Tenor Sans', body: 'Jost', mood: 'minimal', description: 'Calm and balanced for wellness brands' },
      { id: '47', theme: 'Nordic Clean', heading: 'Cabin', body: 'Nunito Sans', mood: 'minimal', description: 'Scandinavian simplicity and warmth' },
      { id: '48', theme: 'Essential Mono', heading: 'Space Mono', body: 'Space Grotesk', mood: 'minimal', description: 'Technical precision for developer tools' },
    ],
    editorial: [
      { id: '49', theme: 'Magazine Style', heading: 'Bodoni Moda', body: 'EB Garamond', mood: 'editorial', description: 'Classic editorial pairing for publications' },
      { id: '50', theme: 'News Print', heading: 'Domine', body: 'Cabin', mood: 'editorial', description: 'Authoritative headers with modern body' },
      { id: '51', theme: 'Fashion Forward', heading: 'Didot', body: 'Raleway', mood: 'editorial', description: 'High fashion aesthetics with elegance' },
      { id: '52', theme: 'Literary Journal', heading: 'Spectral', body: 'Crimson Pro', mood: 'editorial', description: 'Sophisticated reading experience' },
      { id: '53', theme: 'Broadsheet', heading: 'Noto Serif Display', body: 'Noto Sans', mood: 'editorial', description: 'Newspaper authority with clarity' },
      { id: '54', theme: 'Lifestyle Blog', heading: 'Fraunces', body: 'Commissioner', mood: 'editorial', description: 'Warm personality for lifestyle content' },
    ],
    cartoon: [
      { id: '55', theme: 'Comic Book', heading: 'Bangers', body: 'Patrick Hand', mood: 'cartoon', description: 'Bold comic style for fun projects' },
      { id: '56', theme: 'Kids Fun', heading: 'Bubblegum Sans', body: 'Schoolbell', mood: 'cartoon', description: 'Playful and child-friendly typography' },
      { id: '57', theme: 'Sketch Style', heading: 'Permanent Marker', body: 'Indie Flower', mood: 'cartoon', description: 'Hand-drawn feel for creative projects' },
      { id: '58', theme: 'Retro Cartoon', heading: 'Boogaloo', body: 'Gloria Hallelujah', mood: 'cartoon', description: '60s cartoon vibes for nostalgic designs' },
      { id: '59', theme: 'Manga Style', heading: 'Rubik Doodle Shadow', body: 'Kalam', mood: 'cartoon', description: 'Japanese comic book influence' },
      { id: '60', theme: 'Game UI', heading: 'Press Start 2P', body: 'VT323', mood: 'cartoon', description: 'Pixel art gaming aesthetic' },
    ],
    handwritten: [
      { id: '61', theme: 'Personal Touch', heading: 'Dancing Script', body: 'Caveat', mood: 'handwritten', description: 'Elegant script for personal branding' },
      { id: '62', theme: 'Casual Notes', heading: 'Shadows Into Light', body: 'Architects Daughter', mood: 'handwritten', description: 'Relaxed and approachable style' },
      { id: '63', theme: 'Wedding Elegance', heading: 'Great Vibes', body: 'Sacramento', mood: 'handwritten', description: 'Romantic cursive for celebrations' },
      { id: '64', theme: 'Journal Entry', heading: 'Kaushan Script', body: 'Handlee', mood: 'handwritten', description: 'Personal diary feel for blogs' },
      { id: '65', theme: 'Chalk Board', heading: 'Amatic SC', body: 'Covered By Your Grace', mood: 'handwritten', description: 'Rustic and handmade aesthetic' },
      { id: '66', theme: 'Brush Script', heading: 'Alex Brush', body: 'Courgette', mood: 'handwritten', description: 'Artistic brush strokes for luxury' },
    ],
    tech: [
      { id: '67', theme: 'Code Editor', heading: 'JetBrains Mono', body: 'Roboto Mono', mood: 'tech', description: 'Developer-focused monospace pairing' },
      { id: '68', theme: 'Terminal Style', heading: 'Fira Code', body: 'Source Code Pro', mood: 'tech', description: 'Clean code presentation' },
      { id: '69', theme: 'Cyberpunk', heading: 'Orbitron', body: 'Exo 2', mood: 'tech', description: 'Futuristic sci-fi aesthetic' },
      { id: '70', theme: 'AI Interface', heading: 'Rajdhani', body: 'Saira', mood: 'tech', description: 'Modern tech with sharp edges' },
      { id: '71', theme: 'Data Dashboard', heading: 'Titillium Web', body: 'Ubuntu', mood: 'tech', description: 'Clean and readable for analytics' },
      { id: '72', theme: 'Startup Launch', heading: 'Red Hat Display', body: 'Red Hat Text', mood: 'tech', description: 'Open source professional style' },
    ],
  };

  const popularFonts = [
    'Montserrat', 'Open Sans', 'Roboto', 'Lato', 'Poppins',
    'Playfair Display', 'Inter', 'Raleway', 'Nunito', 'Merriweather',
    'Source Sans Pro', 'Oswald', 'PT Sans', 'Ubuntu', 'Quicksand'
  ];

  const generatePairings = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const pairings = fontPairings[selectedMood] || fontPairings.modern;
      setCurrentPairings(pairings);
      setLoading(false);
      toast.success(`Generated ${pairings.length} font pairings for ${selectedMood} mood!`);
    }, 300);
  }, [selectedMood]);

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
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error(`Failed to download ${fontName}. Please try again.`);
    }
  }, []);

  const downloadPairedFonts = useCallback(async (pairing: FontPairing) => {
    toast.info('Downloading font pair...');
    await downloadFont(pairing.heading);
    setTimeout(async () => {
      await downloadFont(pairing.body);
    }, 1000);
  }, [downloadFont]);

  return (
    <section id="fonts" className="py-20 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 glass-nav mb-6">
            <Type className="w-5 h-5 text-primary" />
            <span className="font-medium">Typography Library</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Perfect Font Combinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover harmonious font pairings and download them instantly
          </p>
        </motion.div>

        {/* Font Pairing Generator */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Font Pairing Generator</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={selectedMood} onValueChange={setSelectedMood}>
                <SelectTrigger className="bg-background/50 border-white/20">
                  <SelectValue placeholder="Select mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern & Clean</SelectItem>
                  <SelectItem value="elegant">Elegant & Luxury</SelectItem>
                  <SelectItem value="playful">Playful & Fun</SelectItem>
                  <SelectItem value="professional">Professional & Corporate</SelectItem>
                  <SelectItem value="creative">Creative & Artistic</SelectItem>
                  <SelectItem value="vintage">Vintage & Classic</SelectItem>
                  <SelectItem value="bold">Bold & Impact</SelectItem>
                  <SelectItem value="minimal">Minimal & Swiss</SelectItem>
                  <SelectItem value="editorial">Editorial & Magazine</SelectItem>
                  <SelectItem value="cartoon">Cartoon & Comic</SelectItem>
                  <SelectItem value="handwritten">Handwritten & Script</SelectItem>
                  <SelectItem value="tech">Tech & Futuristic</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={generatePairings}
                disabled={loading}
                className="button-primary"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Pairings
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Font Pairings Display */}
        {currentPairings.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              Curated Pairings for <span className="text-primary capitalize">{selectedMood}</span> Mood
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {currentPairings.map((pairing, index) => {
                const pairingIsFavorite = isFavorite('pairing', pairing.id);
                return (
                  <motion.div
                    key={pairing.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.2) }}
                  >
                    <Card className="glass-card group hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-all duration-200 cursor-pointer relative">
                      <button
                        onClick={() => pairingIsFavorite 
                          ? removeFavorite('pairing', pairing.id)
                          : addFavorite('pairing', pairing.id, pairing)
                        }
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-background/50 hover:bg-background/80 transition-colors z-10"
                        aria-label={pairingIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${pairingIsFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                      </button>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between pr-8">
                          <div>
                            <h4 className="font-bold text-lg mb-1">{pairing.theme}</h4>
                            <p className="text-sm text-muted-foreground">{pairing.description}</p>
                          </div>
                        </div>
                        
                        {/* Font Preview */}
                        <div className="space-y-4 py-4 border-t border-white/10 bg-background/30 rounded-lg p-4 transition-colors group-hover:bg-background/50">
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Heading Font</p>
                            <p className="text-xs font-medium text-primary mb-1">{pairing.heading}</p>
                            <p 
                              className="text-3xl font-bold text-foreground leading-tight"
                              style={{ fontFamily: `'${pairing.heading}', sans-serif` }}
                            >
                              Design Matters
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Body Font</p>
                            <p className="text-xs font-medium text-primary mb-1">{pairing.body}</p>
                            <p 
                              className="text-sm text-foreground leading-relaxed"
                              style={{ fontFamily: `'${pairing.body}', sans-serif` }}
                            >
                              The quick brown fox jumps over the lazy dog. Typography is the art of arranging letters.
                            </p>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => downloadPairedFonts(pairing)}
                          className="w-full button-primary"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Pair
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Popular Fonts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-foreground">Popular Fonts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {(isMobile ? popularFonts.slice(0, 6) : popularFonts).map((font, index) => (
              <motion.div
                key={font}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="glass-card group hover:shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-center space-y-3">
                    <div className="bg-background/30 rounded-lg p-6 mb-2 transition-colors group-hover:bg-background/50">
                      <p 
                        className="text-5xl font-bold text-foreground transition-transform group-hover:scale-110"
                        style={{ fontFamily: `'${font}', sans-serif` }}
                      >
                        Aa
                      </p>
                      <p 
                        className="text-sm text-muted-foreground mt-3"
                        style={{ fontFamily: `'${font}', sans-serif` }}
                      >
                        Design
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{font}</p>
                      <p className="text-xs text-muted-foreground">Sans Serif</p>
                    </div>
                    <Button 
                      onClick={() => downloadFont(font)}
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
        </motion.div>

        {/* Explore More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => navigate('/font-lab')}
            className="button-primary group"
          >
            Explore More Fonts
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* Load Google Fonts for preview - optimized */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link 
        href={`https://fonts.googleapis.com/css2?family=${popularFonts.map(f => f.replace(/ /g, '+')).join('&family=')}&display=swap`}
        rel="stylesheet" 
      />
    </section>
  );
});

FontSection.displayName = 'FontSection';

export default FontSection;