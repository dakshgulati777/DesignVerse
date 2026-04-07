import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BrandProfile } from '@/pages/BrandKit';

interface BrandSetupProps {
  onComplete: (profile: BrandProfile) => void;
}

const TONE_OPTIONS = [
  { value: 'casual-hinglish', label: 'Casual Hinglish 🇮🇳', desc: 'Chill vibe, desi feel' },
  { value: 'professional', label: 'Professional ✨', desc: 'Clean & trustworthy' },
  { value: 'playful', label: 'Playful & Fun 🎉', desc: 'Young, bold, trendy' },
  { value: 'luxury', label: 'Luxury Premium 💎', desc: 'Minimal, high-end' },
  { value: 'quirky', label: 'Quirky Desi 🌶️', desc: 'Witty, meme-culture' },
];

const PRESET_PALETTES = [
  { name: 'Earthy', colors: ['#8B6914', '#D4A847', '#F5E6C8', '#2C1810'] },
  { name: 'Fresh', colors: ['#2D8B4E', '#7BC67E', '#F0FFF4', '#1A4731'] },
  { name: 'Bold', colors: ['#E53E3E', '#FC8181', '#FFF5F5', '#9B2C2C'] },
  { name: 'Ocean', colors: ['#2B6CB0', '#63B3ED', '#EBF8FF', '#1A365D'] },
  { name: 'Royal', colors: ['#6B46C1', '#B794F4', '#FAF5FF', '#44337A'] },
];

const BrandSetup = ({ onComplete }: BrandSetupProps) => {
  const [brandName, setBrandName] = useState('');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [tagline, setTagline] = useState('');
  const [tone, setTone] = useState('casual-hinglish');
  const [colors, setColors] = useState<string[]>(['#000000', '#ffffff']);
  const [newColor, setNewColor] = useState('#E53E3E');

  const addColor = () => {
    if (colors.length < 6) {
      setColors([...colors, newColor]);
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const applyPreset = (preset: string[]) => {
    setColors(preset);
  };

  const handleSubmit = () => {
    if (!brandName.trim() || !productName.trim() || !productCategory.trim()) return;
    onComplete({
      brandName: brandName.trim(),
      productName: productName.trim(),
      productCategory: productCategory.trim(),
      brandColors: colors,
      tagline: tagline.trim(),
      tone,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Set Up Your Brand</h2>
        <p className="text-muted-foreground">Tell us about your D2C brand. We'll use this to create on-brand content.</p>
      </div>

      {/* Brand Name */}
      <div className="space-y-3">
        <label className="text-sm font-semibold tracking-wider uppercase">Brand Name *</label>
        <Input
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="e.g., Honey Hills, Desi Candles"
          className="h-14 text-lg border-foreground/20 bg-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wider uppercase">Product Name *</label>
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Rose Glow Serum"
            className="h-14 text-lg border-foreground/20 bg-transparent"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wider uppercase">Product Category *</label>
          <Input
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            placeholder="e.g., Skincare, Candles, Snacks"
            className="h-14 text-lg border-foreground/20 bg-transparent"
          />
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-3">
        <label className="text-sm font-semibold tracking-wider uppercase">Tagline</label>
        <Input
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="e.g., Pure se Pure, Dil se Desi"
          className="h-14 text-lg border-foreground/20 bg-transparent"
        />
      </div>

      {/* Brand Colors */}
      <div className="space-y-4">
        <label className="text-sm font-semibold tracking-wider uppercase">Brand Colors</label>
        
        {/* Preset Palettes */}
        <div className="flex flex-wrap gap-3">
          {PRESET_PALETTES.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.colors)}
              className="flex items-center gap-2 px-3 py-2 border border-foreground/10 hover:border-foreground/30 transition-colors"
            >
              <div className="flex -space-x-1">
                {preset.colors.map((c, i) => (
                  <div key={i} className="w-4 h-4 rounded-full border border-background" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-xs tracking-wider">{preset.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Colors */}
        <div className="flex flex-wrap items-center gap-3">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative group"
            >
              <div
                className="w-14 h-14 border border-foreground/10 cursor-pointer"
                style={{ backgroundColor: color }}
              />
              <button
                onClick={() => removeColor(i)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              <span className="block text-center text-[10px] text-muted-foreground mt-1 font-mono">{color}</span>
            </motion.div>
          ))}
          {colors.length < 6 && (
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-14 h-14 cursor-pointer border-0 p-0"
              />
              <button
                onClick={addColor}
                className="w-14 h-14 border border-dashed border-foreground/20 flex items-center justify-center hover:border-foreground/40 transition-colors"
              >
                <Plus className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Brand Tone */}
      <div className="space-y-4">
        <label className="text-sm font-semibold tracking-wider uppercase">Brand Tone & Voice</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TONE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setTone(option.value)}
              className={`p-4 text-left border transition-all ${
                tone === option.value
                  ? 'border-foreground bg-foreground/5'
                  : 'border-foreground/10 hover:border-foreground/30'
              }`}
            >
              <div className="font-semibold text-sm">{option.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <motion.button
        onClick={handleSubmit}
        disabled={!brandName.trim() || !productName.trim() || !productCategory.trim()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-4 bg-foreground text-background font-bold tracking-widest text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        NEXT → UPLOAD PRODUCT PHOTO
      </motion.button>
    </div>
  );
};

export default BrandSetup;
