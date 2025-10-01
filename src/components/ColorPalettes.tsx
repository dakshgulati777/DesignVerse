import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, Palette, Check, Sparkles, Wand2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  type: 'analogous' | 'monochrome' | 'triad' | 'complementary' | 'shades';
  isAI?: boolean;
}

const ColorPalettes = () => {
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedType, setSelectedType] = useState<ColorPalette['type']>('analogous');
  const [aiLoading, setAiLoading] = useState(false);

  // Expanded sample palettes
  const samplePalettes: ColorPalette[] = [
    {
      id: '1',
      name: 'Cosmic Purple',
      colors: ['#6B46C1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF'],
      type: 'analogous'
    },
    {
      id: '2',
      name: 'Ocean Depths',
      colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
      type: 'monochrome'
    },
    {
      id: '3',
      name: 'Sunset Vibes',
      colors: ['#DC2626', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
      type: 'triad'
    },
    {
      id: '4',
      name: 'Forest Green',
      colors: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
      type: 'shades'
    },
    {
      id: '5',
      name: 'Coral Sunset',
      colors: ['#F59E0B', '#FB923C', '#FDBA74', '#FED7AA', '#FFF7ED'],
      type: 'monochrome'
    },
    {
      id: '6',
      name: 'Mint Fresh',
      colors: ['#065F46', '#047857', '#059669', '#10B981', '#34D399'],
      type: 'analogous'
    },
    {
      id: '7',
      name: 'Royal Blue',
      colors: ['#1E3A8A', '#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA'],
      type: 'shades'
    },
    {
      id: '8',
      name: 'Cherry Blossom',
      colors: ['#BE185D', '#DB2777', '#EC4899', '#F472B6', '#FBCFE8'],
      type: 'monochrome'
    },
    {
      id: '9',
      name: 'Autumn Leaves',
      colors: ['#DC2626', '#EA580C', '#F59E0B', '#EAB308', '#84CC16'],
      type: 'analogous'
    },
    {
      id: '10',
      name: 'Arctic Ice',
      colors: ['#0F172A', '#334155', '#64748B', '#94A3B8', '#E2E8F0'],
      type: 'monochrome'
    },
    {
      id: '11',
      name: 'Tropical Paradise',
      colors: ['#0891B2', '#06B6D4', '#22D3EE', '#67E8F9', '#CFFAFE'],
      type: 'shades'
    },
    {
      id: '12',
      name: 'Lavender Fields',
      colors: ['#581C87', '#7C3AED', '#8B5CF6', '#A78BFA', '#DDD6FE'],
      type: 'analogous'
    },
    {
      id: '13',
      name: 'Desert Sand',
      colors: ['#92400E', '#D97706', '#F59E0B', '#FBBF24', '#FEF3C7'],
      type: 'monochrome'
    },
    {
      id: '14',
      name: 'Emerald City',
      colors: ['#064E3B', '#065F46', '#047857', '#059669', '#10B981'],
      type: 'shades'
    },
    {
      id: '15',
      name: 'Midnight Storm',
      colors: ['#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF'],
      type: 'monochrome'
    },
    {
      id: '16',
      name: 'Rose Garden',
      colors: ['#9F1239', '#BE185D', '#DB2777', '#EC4899', '#F472B6'],
      type: 'analogous'
    }
  ];

  const displayedSamplePalettes = showMore ? samplePalettes : samplePalettes.slice(0, 4);

  // Generate AI-powered palettes using Colormind API
  const generateAIPalettes = async (prompt?: string, paletteType?: ColorPalette['type']) => {
    const isAI = !!prompt;
    isAI ? setAiLoading(true) : setLoading(true);
    
    try {
      let aiPalettes: ColorPalette[] = [];
      
      if (prompt) {
        // AI-based color generation - generate 6 palettes
        aiPalettes = await generateAIBasedPalettes(prompt, paletteType || selectedType);
        // Hide existing visible palettes and clear old AI palettes
        setShowMore(false);
        setPalettes(prev => [...aiPalettes, ...prev.filter(p => !p.isAI)]);
      } else {
        // Random palettes generation - generate 6 random palettes
        aiPalettes = await generateRandomPalettes();
        setPalettes(aiPalettes);
      }
      
      toast.success(isAI ? `Generated ${aiPalettes.length} AI palettes!` : `Generated ${aiPalettes.length} random palettes!`);
    } catch (error) {
      toast.error('Failed to generate palettes');
      console.error('Palette generation error:', error);
    }
    
    isAI ? setAiLoading(false) : setLoading(false);
  };

  // AI-based palette generation - generate 6 unique palettes
  const generateAIBasedPalettes = async (prompt: string, type: ColorPalette['type']): Promise<ColorPalette[]> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const baseColors = getColorsFromPrompt(prompt);
    const generatedPalettes: ColorPalette[] = [];
    
    // Generate 6 unique palettes with different variations
    const variationTypes: ColorPalette['type'][] = ['analogous', 'complementary', 'monochrome', 'shades', 'triad', 'analogous'];
    
    for (let i = 0; i < 6; i++) {
      const baseColorIndex = i % baseColors.length;
      const baseColor = baseColors[baseColorIndex];
      const variationType = variationTypes[i];
      const colors = generatePaletteFromBase(baseColor, variationType);
      
      generatedPalettes.push({
        id: `ai-${Date.now()}-${i}-${Math.random()}`,
        name: `AI: ${prompt.charAt(0).toUpperCase() + prompt.slice(1)} - ${variationType}`,
        colors,
        type: variationType,
        isAI: true
      });
    }
    
    return generatedPalettes;
  };

  // Generate random palettes
  const generateRandomPalettes = async (): Promise<ColorPalette[]> => {
    const palettes: ColorPalette[] = [];
    const types: ColorPalette['type'][] = ['analogous', 'monochrome', 'triad', 'complementary', 'shades'];
    const themes = ['Cosmic', 'Ocean', 'Forest', 'Desert', 'Arctic', 'Tropical'];
    
    // Try to fetch from Colormind API first
    try {
      const response = await fetch('http://colormind.io/api/', {
        method: 'POST',
        body: JSON.stringify({ model: 'default' })
      });
      
      if (response.ok) {
        const data = await response.json();
        const colors = data.result.map((rgb: number[]) => 
          `#${rgb.map((c: number) => c.toString(16).padStart(2, '0')).join('')}`
        );
        
        palettes.push({
          id: `colormind-${Date.now()}`,
          name: 'Colormind AI',
          colors,
          type: 'complementary'
        });
      }
    } catch (error) {
      console.log('Colormind API unavailable, using fallback');
    }
    
    // Generate 5 more random palettes (6 total)
    for (let i = palettes.length; i < 6; i++) {
      const randomHue = Math.floor(Math.random() * 360);
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const baseColor = hslToHex(randomHue, 70 + Math.random() * 20, 50 + Math.random() * 20);
      const colors = generatePaletteFromBase(baseColor, randomType);
      
      palettes.push({
        id: `random-${Date.now()}-${i}`,
        name: `${randomTheme} ${randomType}`,
        colors,
        type: randomType
      });
    }
    
    return palettes;
  };

  // Fetch palettes from Colormind API
  const fetchColormindPalettes = async (): Promise<ColorPalette[]> => {
    const palettes: ColorPalette[] = [];
    
    try {
      // Try to fetch from Colormind API
      const response = await fetch('http://colormind.io/api/', {
        method: 'POST',
        body: JSON.stringify({ model: 'default' })
      });
      
      if (response.ok) {
        const data = await response.json();
        const colors = data.result.map((rgb: number[]) => 
          `#${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`
        );
        
        palettes.push({
          id: `colormind-${Date.now()}`,
          name: 'Colormind AI',
          colors,
          type: 'complementary'
        });
      }
    } catch (error) {
      console.log('Colormind API unavailable, using fallback');
    }
    
    // Fallback palettes
    const fallbackPalettes: ColorPalette[] = [
      {
        id: '1',
        name: 'Cosmic Purple',
        colors: ['#6B46C1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF'],
        type: 'analogous'
      },
      {
        id: '2',
        name: 'Ocean Depths',
        colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
        type: 'monochrome'
      },
      {
        id: '3',
        name: 'Sunset Vibes',
        colors: ['#DC2626', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
        type: 'triad'
      },
      {
        id: '4',
        name: 'Forest Green',
        colors: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
        type: 'shades'
      }
    ];
    
    return palettes.length > 0 ? palettes : fallbackPalettes;
  };

  // Generate colors from text prompt
  const getColorsFromPrompt = (prompt: string): string[] => {
    const colorMap: { [key: string]: string } = {
      'ocean': '#0EA5E9', 'blue': '#3B82F6', 'sky': '#38BDF8',
      'forest': '#10B981', 'green': '#22C55E', 'nature': '#059669',
      'sunset': '#F59E0B', 'orange': '#F97316', 'warm': '#EF4444',
      'purple': '#8B5CF6', 'cosmic': '#6B46C1', 'space': '#7C3AED',
      'pink': '#EC4899', 'rose': '#F43F5E', 'love': '#E11D48',
      'yellow': '#EAB308', 'gold': '#F59E0B', 'sun': '#FACC15',
      'red': '#EF4444', 'fire': '#DC2626', 'passion': '#B91C1C'
    };
    
    const words = prompt.toLowerCase().split(' ');
    const matchedColors = words.map(word => colorMap[word]).filter(Boolean);
    
    return matchedColors.length > 0 ? matchedColors : ['#6B46C1', '#3B82F6', '#10B981'];
  };

  // Generate palette variations from base color
  const generatePaletteFromBase = (baseColor: string, type: ColorPalette['type']): string[] => {
    const hsl = hexToHsl(baseColor);
    const colors: string[] = [];
    
    switch (type) {
      case 'analogous':
        for (let i = 0; i < 5; i++) {
          colors.push(hslToHex(hsl.h + i * 30, hsl.s, Math.max(20, Math.min(80, hsl.l + i * 10))));
        }
        break;
      case 'monochrome':
        for (let i = 0; i < 5; i++) {
          colors.push(hslToHex(hsl.h, hsl.s, 20 + i * 15));
        }
        break;
      case 'complementary':
        colors.push(baseColor);
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
        colors.push(hslToHex(hsl.h, hsl.s - 20, hsl.l + 20));
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s - 20, hsl.l + 20));
        colors.push(hslToHex(hsl.h, hsl.s / 2, hsl.l + 30));
        break;
      case 'triad':
        colors.push(baseColor);
        colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
        colors.push(hslToHex(hsl.h, hsl.s - 30, hsl.l + 20));
        colors.push(hslToHex((hsl.h + 60) % 360, hsl.s - 20, hsl.l + 10));
        break;
      case 'shades':
        for (let i = 0; i < 5; i++) {
          colors.push(hslToHex(hsl.h, hsl.s, 15 + i * 17));
        }
        break;
    }
    
    return colors;
  };

  // Convert hex to HSL
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      toast.success(`Copied ${color} to clipboard!`);
      
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      toast.error('Failed to copy color');
    }
  };

  const getColorFormats = (hex: string) => {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // Convert to HSL
    const hsl = rgbToHsl(r, g, b);
    
    return {
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      lab: `lab(${Math.round(hsl.l)}% ${Math.round((r-128)/2)} ${Math.round((b-128)/2)})` // Simplified LAB
    };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  useEffect(() => {
    // Load sample palettes on component mount
    setPalettes(displayedSamplePalettes);
  }, [showMore]);

  return (
    <section id="palettes" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 glass-nav mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <span className="font-medium">Color Palettes</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Infinite Color
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Inspiration</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover beautiful color combinations powered by AI and design theory
          </p>
        </motion.div>

        {/* AI Color Generation */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">AI Color Generation</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <Input
                placeholder="Describe your palette (e.g., 'ocean sunset', 'forest morning')"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="lg:col-span-2 bg-background/50 border-white/20"
              />
              
              <Select value={selectedType} onValueChange={(value: ColorPalette['type']) => setSelectedType(value)}>
                <SelectTrigger className="bg-background/50 border-white/20">
                  <SelectValue placeholder="Palette type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triad">Triad</SelectItem>
                  <SelectItem value="shades">Shades</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => generateAIPalettes(aiPrompt, selectedType)}
                disabled={aiLoading || !aiPrompt.trim()}
                className="btn-primary flex-1"
              >
                {aiLoading ? (
                  <Wand2 className="w-5 h-5 mr-2 animate-pulse" />
                ) : (
                  <Wand2 className="w-5 h-5 mr-2" />
                )}
                Generate AI Palette
              </Button>
              
              <Button
                onClick={() => generateAIPalettes()}
                disabled={loading}
                className="btn-glass"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5 mr-2" />
                )}
                Random Palettes
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Palettes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {palettes.map((palette, index) => (
            <motion.div
              key={palette.id}
              className="group relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-4 md:p-6 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:bg-card/70"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                y: -8, 
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.2 }
              }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-glow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                  <h3 className="text-lg md:text-xl font-semibold truncate group-hover:text-primary transition-colors">
                    {palette.name}
                  </h3>
                  <span className="text-xs md:text-sm text-muted-foreground bg-background/20 px-3 py-1 rounded-full self-start sm:self-auto border border-border/20 group-hover:border-primary/30 transition-colors">
                    {palette.type}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1 md:gap-2 mb-4">
                  {palette.colors.map((color, colorIndex) => (
                    <motion.div
                      key={colorIndex}
                      className="relative group/color cursor-pointer overflow-hidden rounded-lg"
                      whileHover={{ 
                        scale: 1.1, 
                        y: -4,
                        rotateY: 10,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyColor(color)}
                    >
                      <div
                        className="w-full h-12 sm:h-16 md:h-20 rounded-lg shadow-lg transition-all duration-300 group-hover/color:shadow-xl"
                        style={{ 
                          backgroundColor: color,
                          boxShadow: `0 4px 20px ${color}40, 0 0 0 1px ${color}20`
                        }}
                      />
                      
                      {/* Color Info Overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center text-white text-xs"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {copiedColor === color ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex flex-col items-center"
                          >
                            <Check className="w-3 h-3 md:w-4 md:h-4 mb-1 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                          </motion.div>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 md:w-4 md:h-4 mb-1" />
                            <span className="font-mono text-xs">{color}</span>
                          </>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Color Format Display */}
                <div className="space-y-1 md:space-y-2">
                  {palette.colors.slice(0, 2).map((color, i) => {
                    const formats = getColorFormats(color);
                    return (
                      <div key={i} className="text-xs md:text-sm font-mono text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                        <span className="truncate">HEX: {formats.hex}</span>
                        <span className="truncate">RGB: {formats.rgb}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button - Only show if there are sample palettes to show */}
        {samplePalettes.length > 4 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={() => setShowMore(!showMore)}
              className="btn-glass hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
            >
              <span className="mr-2">{showMore ? 'Show Less' : 'Show More'} Palettes</span>
              {showMore ? (
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ColorPalettes;