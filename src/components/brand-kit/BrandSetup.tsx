import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Palette, Target, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BrandProfile } from '@/pages/BrandKit';

interface BrandSetupProps {
  onComplete: (profile: BrandProfile) => void;
}

const TONE_OPTIONS = [
  { value: 'casual-hinglish', label: 'Casual Hinglish', desc: 'Friendly, relatable, creator-first copy' },
  { value: 'professional', label: 'Professional', desc: 'Clean, clear, and trustworthy communication' },
  { value: 'playful', label: 'Playful', desc: 'Energetic, youthful, and scroll-stopping' },
  { value: 'luxury', label: 'Luxury Premium', desc: 'Minimal, elevated, and editorial' },
  { value: 'quirky', label: 'Quirky Desi', desc: 'Bold, witty, and meme-aware' },
];

const CONTENT_GOALS = [
  'Launch awareness',
  'Drive product sales',
  'Build trust',
  'Grow social engagement',
  'Educate new customers',
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
  const [colors, setColors] = useState<string[]>(['#111111', '#F5F5F5', '#D4A847']);
  const [newColor, setNewColor] = useState('#E53E3E');
  const [targetAudience, setTargetAudience] = useState('');
  const [brandUSP, setBrandUSP] = useState('');
  const [contentGoal, setContentGoal] = useState(CONTENT_GOALS[0]);

  const addColor = () => {
    if (colors.length < 6 && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const applyPreset = (preset: string[]) => {
    setColors(preset);
  };

  const colorSummary = useMemo(() => colors.join(' | '), [colors]);
  const isValid = brandName.trim() && productName.trim() && productCategory.trim() && targetAudience.trim() && brandUSP.trim();

  const handleSubmit = () => {
    if (!isValid) return;

    onComplete({
      brandName: brandName.trim(),
      productName: productName.trim(),
      productCategory: productCategory.trim(),
      brandColors: colors,
      tagline: tagline.trim(),
      tone,
      targetAudience: targetAudience.trim(),
      brandUSP: brandUSP.trim(),
      contentGoal,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8 border border-foreground/10 bg-background/70 p-5 sm:p-8">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Build a More Accurate Brand Kit</h2>
            <p className="text-muted-foreground">
              Better inputs give better reels, captions, and campaign concepts. Add your audience, positioning, and goal so the generator has real brand context.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wider uppercase">Brand Name *</label>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g., Honey Hills"
                className="h-14 text-lg border-foreground/20 bg-transparent"
              />
            </div>
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
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wider uppercase">Target Audience *</label>
              <Input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Gen Z skincare shoppers in India"
                className="h-14 text-lg border-foreground/20 bg-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wider uppercase">Tagline</label>
              <Input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g., Pure care for real routines"
                className="h-14 text-lg border-foreground/20 bg-transparent"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wider uppercase">Key Differentiator *</label>
              <Input
                value={brandUSP}
                onChange={(e) => setBrandUSP(e.target.value)}
                placeholder="e.g., Cold-processed and fragrance-free"
                className="h-14 text-lg border-foreground/20 bg-transparent"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold tracking-wider uppercase">Brand Colors</label>
            <div className="flex flex-wrap gap-3">
              {PRESET_PALETTES.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
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

            <div className="flex flex-wrap items-center gap-3">
              {colors.map((color, i) => (
                <motion.div
                  key={`${color}-${i}`}
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative group"
                >
                  <div className="w-14 h-14 border border-foreground/10 cursor-pointer" style={{ backgroundColor: color }} />
                  <button
                    type="button"
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
                    className="w-14 h-14 cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="w-14 h-14 border border-dashed border-foreground/20 flex items-center justify-center hover:border-foreground/40 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Current palette: {colorSummary}</p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold tracking-wider uppercase">Brand Tone</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TONE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTone(option.value)}
                  className={`p-4 text-left border transition-all ${
                    tone === option.value ? 'border-foreground bg-foreground/5' : 'border-foreground/10 hover:border-foreground/30'
                  }`}
                >
                  <div className="font-semibold text-sm">{option.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold tracking-wider uppercase">Primary Content Goal</label>
            <div className="flex flex-wrap gap-2">
              {CONTENT_GOALS.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setContentGoal(goal)}
                  className={`px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase border transition-all ${
                    contentGoal === goal ? 'bg-foreground text-background border-foreground' : 'border-foreground/10 text-muted-foreground hover:border-foreground/30'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-foreground/10 bg-gradient-to-br from-foreground/[0.05] via-transparent to-primary/10 p-5 sm:p-8 space-y-6">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            Brand Accuracy
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">What this improves</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <Palette className="w-4 h-4 mt-0.5 text-primary" />
                <p>Reel covers and posts use your real palette instead of generic tones.</p>
              </div>
              <div className="flex gap-3">
                <Target className="w-4 h-4 mt-0.5 text-primary" />
                <p>Captions and hooks align better with your audience and campaign objective.</p>
              </div>
              <div className="flex gap-3">
                <Sparkles className="w-4 h-4 mt-0.5 text-primary" />
                <p>Video prompts carry stronger positioning so reel generation has a clearer brief.</p>
              </div>
            </div>
          </div>

          <div className="border border-foreground/10 bg-background/70 p-4 space-y-3">
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground">Preview Brief</p>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Brand:</span> {brandName || 'Your brand name'}</p>
              <p><span className="text-muted-foreground">Product:</span> {productName || 'Your hero product'}</p>
              <p><span className="text-muted-foreground">Audience:</span> {targetAudience || 'Who you want to reach'}</p>
              <p><span className="text-muted-foreground">USP:</span> {brandUSP || 'Your strongest differentiator'}</p>
              <p><span className="text-muted-foreground">Goal:</span> {contentGoal}</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold tracking-wider uppercase">Accuracy Notes</label>
            <Textarea
              value={`Audience fit: ${targetAudience || 'Not added yet'}\nUSP: ${brandUSP || 'Not added yet'}\nTone: ${tone}\nGoal: ${contentGoal}`}
              readOnly
              className="min-h-[120px] border-foreground/20 bg-transparent text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={handleSubmit}
        disabled={!isValid}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-4 bg-foreground text-background font-bold tracking-widest text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        NEXT - UPLOAD PRODUCT PHOTO
      </motion.button>
    </div>
  );
};

export default BrandSetup;
