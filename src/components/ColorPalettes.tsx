import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, Palette, Check, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  type: 'analogous' | 'monochrome' | 'triad' | 'complementary' | 'shades';
}

const ColorPalettes = () => {
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedType, setSelectedType] = useState<ColorPalette['type']>('analogous');
  const [aiLoading, setAiLoading] = useState(false);

  // Generate AI-powered palettes using Colormind API
  const generateAIPalettes = async (prompt?: string, paletteType?: ColorPalette['type']) => {
    const isAI = !!prompt;
    isAI ? setAiLoading(true) : setLoading(true);
    
    try {
      let aiPalettes: ColorPalette[] = [];
      
      if (prompt) {
        // AI-based color generation
        aiPalettes = await generateAIBasedPalettes(prompt, paletteType || selectedType);
      } else {
        // Fetch from Colormind API or use samples
        aiPalettes = await fetchColormindPalettes();
      }
      
      setPalettes(prev => isAI ? [...aiPalettes, ...prev] : aiPalettes);
      toast.success(isAI ? 'AI palettes generated!' : 'New palettes generated!');
    } catch (error) {
      toast.error('Failed to generate palettes');
      console.error('Palette generation error:', error);
    }
    
    isAI ? setAiLoading(false) : setLoading(false);
  };

  // AI-based palette generation
  const generateAIBasedPalettes = async (prompt: string, type: ColorPalette['type']): Promise<ColorPalette[]> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const baseColors = getColorsFromPrompt(prompt);
    const generatedPalettes: ColorPalette[] = [];
    
    for (let i = 0; i < 2; i++) {
      const baseColor = baseColors[i % baseColors.length];
      const colors = generatePaletteFromBase(baseColor, type);
      
      generatedPalettes.push({
        id: `ai-${Date.now()}-${i}`,
        name: `AI: ${prompt.charAt(0).toUpperCase() + prompt.slice(1)} ${i + 1}`,
        colors,
        type
      });
    }
    
    return generatedPalettes;
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
    generateAIPalettes();
  }, []);

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
              className="parallax-card group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h3 className="text-lg md:text-xl font-semibold truncate">{palette.name}</h3>
                <span className="text-xs md:text-sm text-muted-foreground bg-white/10 px-3 py-1 rounded-full self-start sm:self-auto">
                  {palette.type}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1 md:gap-2 mb-4">
                {palette.colors.map((color, colorIndex) => (
                  <motion.div
                    key={colorIndex}
                    className="relative group/color cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyColor(color)}
                  >
                    <div
                      className="w-full h-12 sm:h-16 md:h-20 rounded-lg shadow-lg transition-all duration-300"
                      style={{ backgroundColor: color }}
                    />
                    
                    {/* Color Info Overlay */}
                    <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover/color:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white text-xs">
                      {copiedColor === color ? (
                        <Check className="w-3 h-3 md:w-4 md:h-4 mb-1" />
                      ) : (
                        <Copy className="w-3 h-3 md:w-4 md:h-4 mb-1" />
                      )}
                      <span className="font-mono text-xs">{color}</span>
                    </div>
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
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button className="btn-primary">
            Show More Palettes
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ColorPalettes;