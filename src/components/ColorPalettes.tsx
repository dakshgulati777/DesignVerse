import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  // Generate sample palettes
  const generatePalettes = async () => {
    setLoading(true);
    
    // Sample palettes - in a real app, you'd fetch from Colormind API
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
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPalettes(samplePalettes);
    setLoading(false);
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
    generatePalettes();
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

        {/* Generate Button */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={generatePalettes}
            disabled={loading}
            className="btn-glass"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5 mr-2" />
            )}
            Generate New Palettes
          </Button>
        </motion.div>

        {/* Palettes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {palettes.map((palette, index) => (
            <motion.div
              key={palette.id}
              className="parallax-card group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{palette.name}</h3>
                <span className="text-sm text-muted-foreground bg-white/10 px-3 py-1 rounded-full">
                  {palette.type}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {palette.colors.map((color, colorIndex) => (
                  <motion.div
                    key={colorIndex}
                    className="relative group/color cursor-pointer"
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => copyColor(color)}
                  >
                    <div
                      className="w-full h-20 rounded-lg shadow-lg transition-all duration-300"
                      style={{ backgroundColor: color }}
                    />
                    
                    {/* Color Info Overlay */}
                    <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover/color:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white text-xs">
                      {copiedColor === color ? (
                        <Check className="w-4 h-4 mb-1" />
                      ) : (
                        <Copy className="w-4 h-4 mb-1" />
                      )}
                      <span className="font-mono">{color}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Color Format Display */}
              <div className="space-y-2">
                {palette.colors.slice(0, 2).map((color, i) => {
                  const formats = getColorFormats(color);
                  return (
                    <div key={i} className="text-sm font-mono text-muted-foreground grid grid-cols-2 gap-4">
                      <span>HEX: {formats.hex}</span>
                      <span>RGB: {formats.rgb}</span>
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