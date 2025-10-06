import { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, Download, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

interface FontPairing {
  id: string;
  theme: string;
  heading: string;
  body: string;
  mood: string;
  description: string;
}

const FontSection = () => {
  const [selectedMood, setSelectedMood] = useState<string>('modern');
  const [currentPairings, setCurrentPairings] = useState<FontPairing[]>([]);
  const [loading, setLoading] = useState(false);

  // Curated font pairings based on different themes and moods
  const fontPairings: { [key: string]: FontPairing[] } = {
    modern: [
      {
        id: '1',
        theme: 'Modern Minimalist',
        heading: 'Montserrat',
        body: 'Open Sans',
        mood: 'modern',
        description: 'Clean, professional, and highly readable for tech and business'
      },
      {
        id: '2',
        theme: 'Modern Tech',
        heading: 'Inter',
        body: 'Roboto',
        mood: 'modern',
        description: 'Perfect for SaaS products and digital platforms'
      },
      {
        id: '3',
        theme: 'Modern Bold',
        heading: 'Poppins',
        body: 'Lato',
        mood: 'modern',
        description: 'Confident and contemporary with excellent legibility'
      }
    ],
    elegant: [
      {
        id: '4',
        theme: 'Classic Elegance',
        heading: 'Playfair Display',
        body: 'Source Sans Pro',
        mood: 'elegant',
        description: 'Timeless sophistication for luxury brands'
      },
      {
        id: '5',
        theme: 'Refined Luxury',
        heading: 'Cormorant Garamond',
        body: 'Montserrat',
        mood: 'elegant',
        description: 'High-end editorial and fashion-forward designs'
      },
      {
        id: '6',
        theme: 'Sophisticated Style',
        heading: 'Merriweather',
        body: 'Open Sans',
        mood: 'elegant',
        description: 'Perfect balance of tradition and readability'
      }
    ],
    playful: [
      {
        id: '7',
        theme: 'Fun & Friendly',
        heading: 'Quicksand',
        body: 'Nunito',
        mood: 'playful',
        description: 'Warm and approachable for creative brands'
      },
      {
        id: '8',
        theme: 'Cheerful Vibes',
        heading: 'Pacifico',
        body: 'Raleway',
        mood: 'playful',
        description: 'Casual and energetic for lifestyle products'
      },
      {
        id: '9',
        theme: 'Creative Energy',
        heading: 'Righteous',
        body: 'Lato',
        mood: 'playful',
        description: 'Bold personality with balanced readability'
      }
    ],
    professional: [
      {
        id: '10',
        theme: 'Corporate Classic',
        heading: 'Roboto',
        body: 'Roboto',
        mood: 'professional',
        description: 'Trusted and reliable for business communications'
      },
      {
        id: '11',
        theme: 'Executive Style',
        heading: 'Libre Baskerville',
        body: 'Source Sans Pro',
        mood: 'professional',
        description: 'Authoritative presence with modern accessibility'
      },
      {
        id: '12',
        theme: 'Professional Edge',
        heading: 'Work Sans',
        body: 'IBM Plex Sans',
        mood: 'professional',
        description: 'Contemporary professionalism for forward-thinking brands'
      }
    ],
    creative: [
      {
        id: '13',
        theme: 'Artistic Expression',
        heading: 'Bebas Neue',
        body: 'Raleway',
        mood: 'creative',
        description: 'Bold statements with refined details'
      },
      {
        id: '14',
        theme: 'Design Studio',
        heading: 'Oswald',
        body: 'Open Sans',
        mood: 'creative',
        description: 'Strong hierarchy with versatile body text'
      },
      {
        id: '15',
        theme: 'Innovative Spirit',
        heading: 'Space Grotesk',
        body: 'Inter',
        mood: 'creative',
        description: 'Future-forward aesthetic with technical precision'
      }
    ],
    vintage: [
      {
        id: '16',
        theme: 'Retro Revival',
        heading: 'Abril Fatface',
        body: 'Lato',
        mood: 'vintage',
        description: 'Classic display with contemporary readability'
      },
      {
        id: '17',
        theme: 'Nostalgic Charm',
        heading: 'Cinzel',
        body: 'Crimson Text',
        mood: 'vintage',
        description: 'Historical elegance meets modern typography'
      },
      {
        id: '18',
        theme: 'Heritage Style',
        heading: 'Yeseva One',
        body: 'Josefin Sans',
        mood: 'vintage',
        description: 'Vintage personality with clean supporting text'
      }
    ]
  };

  const popularFonts = [
    'Montserrat', 'Open Sans', 'Roboto', 'Lato', 'Poppins',
    'Playfair Display', 'Inter', 'Raleway', 'Nunito', 'Merriweather',
    'Source Sans Pro', 'Oswald', 'PT Sans', 'Ubuntu', 'Quicksand'
  ];

  const generatePairings = () => {
    setLoading(true);
    setTimeout(() => {
      const pairings = fontPairings[selectedMood] || fontPairings.modern;
      setCurrentPairings(pairings);
      setLoading(false);
      toast.success(`Generated ${pairings.length} font pairings for ${selectedMood} mood!`);
    }, 500);
  };

  const downloadFont = (fontName: string) => {
    const googleFontUrl = `https://fonts.google.com/specimen/${fontName.replace(/ /g, '+')}`;
    window.open(googleFontUrl, '_blank');
    toast.success(`Opening ${fontName} download page...`);
  };

  const downloadPairedFonts = (pairing: FontPairing) => {
    const headingUrl = `https://fonts.google.com/specimen/${pairing.heading.replace(/ /g, '+')}`;
    const bodyUrl = `https://fonts.google.com/specimen/${pairing.body.replace(/ /g, '+')}`;
    
    window.open(headingUrl, '_blank');
    setTimeout(() => {
      window.open(bodyUrl, '_blank');
    }, 500);
    
    toast.success(`Opening download pages for ${pairing.heading} & ${pairing.body}...`);
  };

  return (
    <section id="fonts" className="py-20 px-6 bg-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 glass-nav mb-6">
            <Type className="w-5 h-5 text-primary" />
            <span className="font-medium">Typography Library</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Perfect Font
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Combinations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover harmonious font pairings and download them instantly from Google Fonts
          </p>
        </motion.div>

        {/* Font Pairing Generator */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              Curated Pairings for <span className="text-primary capitalize">{selectedMood}</span> Mood
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPairings.map((pairing, index) => (
                <motion.div
                  key={pairing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card group hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-lg mb-1">{pairing.theme}</h4>
                          <p className="text-sm text-muted-foreground">{pairing.description}</p>
                        </div>
                      </div>
                      
                      {/* Font Preview */}
                      <div className="space-y-4 py-4 border-t border-white/10 bg-background/30 rounded-lg p-4">
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
              ))}
            </div>
          </motion.div>
        )}

        {/* Popular Fonts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Popular Google Fonts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {popularFonts.map((font, index) => (
              <motion.div
                key={font}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card group hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <div className="text-center space-y-3">
                    <div className="bg-background/30 rounded-lg p-6 mb-2">
                      <p 
                        className="text-5xl font-bold text-foreground"
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
                    <p className="text-sm font-medium text-foreground">{font}</p>
                    <Button 
                      onClick={() => downloadFont(font)}
                      variant="outline"
                      size="sm"
                      className="w-full"
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

        {/* Load Google Fonts for preview */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;600&family=Roboto:wght@400;700&family=Lato:wght@400;700&family=Poppins:wght@400;700&family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&family=Raleway:wght@400;700&family=Nunito:wght@400;700&family=Merriweather:wght@400;700&family=Source+Sans+Pro:wght@400;600&family=Oswald:wght@400;700&family=PT+Sans:wght@400;700&family=Ubuntu:wght@400;700&family=Quicksand:wght@400;700&family=Cormorant+Garamond:wght@400;700&family=Pacifico&family=Righteous&family=Libre+Baskerville:wght@400;700&family=Work+Sans:wght@400;700&family=IBM+Plex+Sans:wght@400;600&family=Bebas+Neue&family=Space+Grotesk:wght@400;700&family=Abril+Fatface&family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;700&family=Yeseva+One&family=Josefin+Sans:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
      </div>
    </section>
  );
};

export default FontSection;
