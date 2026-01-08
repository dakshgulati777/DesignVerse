import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Copy, RefreshCw, Palette, Check, Sparkles, Wand2, ChevronDown, ChevronUp, Bookmark, BookmarkCheck, GitCompare, Circle, Download, FileJson, FileCode, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import ColorSphere3D from './ColorSphere3D';
import ImagePaletteExtractor from './ImagePaletteExtractor';
import ParallaxCard from './ParallaxCard';
import Interactive3DCard from './Interactive3DCard';
import ColorHarmonyWheel from './ColorHarmonyWheel';
import PaletteComparison from './PaletteComparison';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAnimations, hoverAnimations } from '@/hooks/useAnimations';

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  type: 'monochrome' | 'triad' | 'complementary' | 'shades' | 'split-complementary' | 'analogous';
  isAI?: boolean;
}

// Slide-in animation variants
const slideInVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut" as const
    }
  })
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut" as const
    }
  })
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut" as const
    }
  })
};

const ColorPalettes = () => {
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedType, setSelectedType] = useState<ColorPalette['type']>('complementary');
  const [aiLoading, setAiLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [baseHue, setBaseHue] = useState(0);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { stellarFadeIn, orbitRise, floatingPanel, blurToClear } = useAnimations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isToolsInView = useInView(toolsRef, { once: true, amount: 0.2 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Sample palettes with new types
  const samplePalettes: ColorPalette[] = [
    { id: '1', name: 'Cosmic Purple', colors: ['#6B46C1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#E0E7FF'], type: 'shades' },
    { id: '2', name: 'Ocean Depths', colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'], type: 'monochrome' },
    { id: '3', name: 'Sunset Vibes', colors: ['#DC2626', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'], type: 'triad' },
    { id: '4', name: 'Forest Green', colors: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'], type: 'shades' },
    { id: '5', name: 'Coral Sunset', colors: ['#F59E0B', '#FB923C', '#FDBA74', '#FED7AA', '#FFF7ED'], type: 'monochrome' },
    { id: '6', name: 'Spring Breeze', colors: ['#10B981', '#22C55E', '#4ADE80', '#86EFAC', '#BBF7D0'], type: 'analogous' },
    { id: '7', name: 'Royal Blue', colors: ['#1E3A8A', '#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA'], type: 'shades' },
    { id: '8', name: 'Cherry Blossom', colors: ['#BE185D', '#DB2777', '#EC4899', '#F472B6', '#FBCFE8'], type: 'monochrome' },
    { id: '9', name: 'Autumn Harmony', colors: ['#DC2626', '#22C55E', '#16A34A', '#F97316', '#EA580C'], type: 'split-complementary' },
    { id: '10', name: 'Arctic Ice', colors: ['#0F172A', '#334155', '#64748B', '#94A3B8', '#E2E8F0'], type: 'monochrome' },
    { id: '11', name: 'Tropical Paradise', colors: ['#0891B2', '#06B6D4', '#22D3EE', '#67E8F9', '#CFFAFE'], type: 'analogous' },
    { id: '12', name: 'Lavender Fields', colors: ['#581C87', '#7C3AED', '#8B5CF6', '#A78BFA', '#DDD6FE'], type: 'monochrome' },
  ];

  // Show 4 palettes by default, more when expanded
  const displayedPalettes = showMore ? palettes : palettes.slice(0, 4);

  // Comprehensive color database for accurate generation
  const colorDatabase: Record<string, { hex: string; hue: number; saturation: number; lightness: number }> = {
    // Basic colors
    'red': { hex: '#EF4444', hue: 0, saturation: 84, lightness: 60 },
    'crimson': { hex: '#DC143C', hue: 348, saturation: 83, lightness: 47 },
    'scarlet': { hex: '#FF2400', hue: 9, saturation: 100, lightness: 50 },
    'maroon': { hex: '#800000', hue: 0, saturation: 100, lightness: 25 },
    'orange': { hex: '#F97316', hue: 25, saturation: 95, lightness: 53 },
    'tangerine': { hex: '#FF9966', hue: 24, saturation: 100, lightness: 70 },
    'peach': { hex: '#FFCBA4', hue: 28, saturation: 100, lightness: 82 },
    'coral': { hex: '#FF7F50', hue: 16, saturation: 100, lightness: 66 },
    'yellow': { hex: '#EAB308', hue: 48, saturation: 89, lightness: 47 },
    'gold': { hex: '#FFD700', hue: 51, saturation: 100, lightness: 50 },
    'amber': { hex: '#FFBF00', hue: 45, saturation: 100, lightness: 50 },
    'lemon': { hex: '#FFF44F', hue: 56, saturation: 100, lightness: 65 },
    'green': { hex: '#22C55E', hue: 142, saturation: 71, lightness: 45 },
    'lime': { hex: '#84CC16', hue: 84, saturation: 81, lightness: 44 },
    'emerald': { hex: '#059669', hue: 160, saturation: 84, lightness: 39 },
    'jade': { hex: '#00A86B', hue: 155, saturation: 100, lightness: 33 },
    'mint': { hex: '#3EB489', hue: 150, saturation: 50, lightness: 50 },
    'sage': { hex: '#9DC183', hue: 100, saturation: 36, lightness: 64 },
    'olive': { hex: '#808000', hue: 60, saturation: 100, lightness: 25 },
    'teal': { hex: '#14B8A6', hue: 174, saturation: 84, lightness: 40 },
    'cyan': { hex: '#06B6D4', hue: 189, saturation: 94, lightness: 43 },
    'turquoise': { hex: '#40E0D0', hue: 174, saturation: 72, lightness: 56 },
    'aqua': { hex: '#00FFFF', hue: 180, saturation: 100, lightness: 50 },
    'blue': { hex: '#3B82F6', hue: 217, saturation: 91, lightness: 60 },
    'navy': { hex: '#1E40AF', hue: 224, saturation: 70, lightness: 40 },
    'royal': { hex: '#4169E1', hue: 225, saturation: 73, lightness: 57 },
    'cobalt': { hex: '#0047AB', hue: 215, saturation: 100, lightness: 34 },
    'azure': { hex: '#007FFF', hue: 210, saturation: 100, lightness: 50 },
    'sky': { hex: '#38BDF8', hue: 199, saturation: 92, lightness: 60 },
    'indigo': { hex: '#6366F1', hue: 239, saturation: 84, lightness: 67 },
    'purple': { hex: '#8B5CF6', hue: 258, saturation: 90, lightness: 66 },
    'violet': { hex: '#7C3AED', hue: 262, saturation: 83, lightness: 58 },
    'lavender': { hex: '#E6E6FA', hue: 240, saturation: 67, lightness: 94 },
    'plum': { hex: '#DDA0DD', hue: 300, saturation: 47, lightness: 75 },
    'magenta': { hex: '#FF00FF', hue: 300, saturation: 100, lightness: 50 },
    'fuchsia': { hex: '#FF00FF', hue: 300, saturation: 100, lightness: 50 },
    'pink': { hex: '#EC4899', hue: 330, saturation: 81, lightness: 60 },
    'rose': { hex: '#F43F5E', hue: 350, saturation: 89, lightness: 60 },
    'blush': { hex: '#DE5D83', hue: 342, saturation: 66, lightness: 62 },
    'salmon': { hex: '#FA8072', hue: 6, saturation: 93, lightness: 71 },
    'brown': { hex: '#92400E', hue: 28, saturation: 83, lightness: 31 },
    'chocolate': { hex: '#7B3F00', hue: 31, saturation: 100, lightness: 24 },
    'coffee': { hex: '#6F4E37', hue: 25, saturation: 35, lightness: 33 },
    'tan': { hex: '#D2B48C', hue: 34, saturation: 44, lightness: 69 },
    'beige': { hex: '#F5F5DC', hue: 60, saturation: 56, lightness: 91 },
    'cream': { hex: '#FFFDD0', hue: 57, saturation: 100, lightness: 91 },
    'ivory': { hex: '#FFFFF0', hue: 60, saturation: 100, lightness: 97 },
    'white': { hex: '#FFFFFF', hue: 0, saturation: 0, lightness: 100 },
    'gray': { hex: '#6B7280', hue: 220, saturation: 9, lightness: 46 },
    'grey': { hex: '#6B7280', hue: 220, saturation: 9, lightness: 46 },
    'silver': { hex: '#C0C0C0', hue: 0, saturation: 0, lightness: 75 },
    'charcoal': { hex: '#36454F', hue: 200, saturation: 19, lightness: 26 },
    'black': { hex: '#000000', hue: 0, saturation: 0, lightness: 0 },
    // Nature-inspired
    'ocean': { hex: '#0077B6', hue: 200, saturation: 100, lightness: 36 },
    'sea': { hex: '#006994', hue: 197, saturation: 100, lightness: 29 },
    'forest': { hex: '#228B22', hue: 120, saturation: 61, lightness: 34 },
    'nature': { hex: '#4CAF50', hue: 122, saturation: 39, lightness: 49 },
    'earth': { hex: '#8B4513', hue: 25, saturation: 76, lightness: 31 },
    'sand': { hex: '#C2B280', hue: 42, saturation: 33, lightness: 63 },
    'sunset': { hex: '#FF7E5F', hue: 12, saturation: 100, lightness: 69 },
    'sunrise': { hex: '#FFCF48', hue: 45, saturation: 100, lightness: 64 },
    'fire': { hex: '#FF4500', hue: 16, saturation: 100, lightness: 50 },
    'flame': { hex: '#E25822', hue: 17, saturation: 76, lightness: 51 },
    'ice': { hex: '#A5F2F3', hue: 181, saturation: 77, lightness: 80 },
    'snow': { hex: '#FFFAFA', hue: 0, saturation: 100, lightness: 99 },
    'winter': { hex: '#A8DADC', hue: 182, saturation: 44, lightness: 76 },
    'spring': { hex: '#98FB98', hue: 120, saturation: 93, lightness: 79 },
    'summer': { hex: '#FFD93D', hue: 48, saturation: 100, lightness: 62 },
    'autumn': { hex: '#D2691E', hue: 25, saturation: 75, lightness: 47 },
    'fall': { hex: '#FF8C00', hue: 33, saturation: 100, lightness: 50 },
    'night': { hex: '#191970', hue: 240, saturation: 64, lightness: 27 },
    'dawn': { hex: '#FFB7C5', hue: 347, saturation: 100, lightness: 86 },
    'dusk': { hex: '#4E387E', hue: 259, saturation: 36, lightness: 36 },
    'moon': { hex: '#F4F1DE', hue: 48, saturation: 47, lightness: 91 },
    'star': { hex: '#FFD700', hue: 51, saturation: 100, lightness: 50 },
    'cosmic': { hex: '#6B46C1', hue: 262, saturation: 52, lightness: 51 },
    'space': { hex: '#2C3E50', hue: 210, saturation: 29, lightness: 24 },
    'galaxy': { hex: '#5D4E8C', hue: 258, saturation: 29, lightness: 43 },
    'nebula': { hex: '#8E4585', hue: 305, saturation: 35, lightness: 40 },
    // Moods/Tones
    'warm': { hex: '#FF6B35', hue: 17, saturation: 100, lightness: 60 },
    'cool': { hex: '#4ECDC4', hue: 175, saturation: 61, lightness: 56 },
    'bright': { hex: '#FFE66D', hue: 51, saturation: 100, lightness: 71 },
    'dark': { hex: '#2D3436', hue: 184, saturation: 7, lightness: 19 },
    'light': { hex: '#DFE6E9', hue: 200, saturation: 18, lightness: 90 },
    'pastel': { hex: '#FFB5E8', hue: 327, saturation: 100, lightness: 85 },
    'neon': { hex: '#39FF14', hue: 115, saturation: 100, lightness: 54 },
    'muted': { hex: '#9B9B9B', hue: 0, saturation: 0, lightness: 61 },
    'vibrant': { hex: '#FF1493', hue: 328, saturation: 100, lightness: 54 },
    'tropical': { hex: '#00CED1', hue: 181, saturation: 100, lightness: 41 },
    'arctic': { hex: '#E0FFFF', hue: 180, saturation: 100, lightness: 94 },
    'desert': { hex: '#EDC9AF', hue: 28, saturation: 54, lightness: 81 },
    // Gemstones
    'ruby': { hex: '#E0115F', hue: 337, saturation: 88, lightness: 47 },
    'sapphire': { hex: '#0F52BA', hue: 219, saturation: 85, lightness: 39 },
    'diamond': { hex: '#B9F2FF', hue: 188, saturation: 100, lightness: 84 },
    'pearl': { hex: '#EAE0C8', hue: 42, saturation: 39, lightness: 85 },
    'amethyst': { hex: '#9966CC', hue: 270, saturation: 50, lightness: 60 },
    'topaz': { hex: '#FFC87C', hue: 38, saturation: 100, lightness: 74 },
    'opal': { hex: '#A8C3BC', hue: 162, saturation: 20, lightness: 72 },
    // Metals
    'copper': { hex: '#B87333', hue: 28, saturation: 56, lightness: 46 },
    'bronze': { hex: '#CD7F32', hue: 30, saturation: 60, lightness: 50 },
  };

  // Export functions
  const exportAsPNG = async (palette: ColorPalette) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const colorWidth = 120;
    const height = 200;
    canvas.width = palette.colors.length * colorWidth;
    canvas.height = height;

    // Draw colors
    palette.colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * colorWidth, 0, colorWidth, height - 40);
      
      // Draw hex code
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(i * colorWidth, height - 40, colorWidth, 40);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(color, i * colorWidth + colorWidth / 2, height - 15);
    });

    // Add palette name
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${palette.name} (${palette.type})`, 10, 20);

    const link = document.createElement('a');
    link.download = `${palette.name.replace(/\s+/g, '-').toLowerCase()}-palette.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Palette exported as PNG!');
  };

  const exportAsCSS = (palette: ColorPalette) => {
    const cssVars = palette.colors.map((color, i) => 
      `  --color-${i + 1}: ${color};`
    ).join('\n');
    
    const css = `:root {\n  /* ${palette.name} - ${palette.type} palette */\n${cssVars}\n}`;
    
    const blob = new Blob([css], { type: 'text/css' });
    const link = document.createElement('a');
    link.download = `${palette.name.replace(/\s+/g, '-').toLowerCase()}-palette.css`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success('Palette exported as CSS!');
  };

  const exportAsJSON = (palette: ColorPalette) => {
    const json = JSON.stringify({
      name: palette.name,
      type: palette.type,
      colors: palette.colors.map((hex, i) => ({
        index: i + 1,
        hex,
        rgb: hexToRgb(hex),
      }))
    }, null, 2);
    
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `${palette.name.replace(/\s+/g, '-').toLowerCase()}-palette.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success('Palette exported as JSON!');
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Generate AI-powered palettes
  const generateAIPalettes = async (prompt?: string, paletteType?: ColorPalette['type']) => {
    const isAI = !!prompt;
    
    if (isAI && prompt && !isValidColorPrompt(prompt)) {
      toast.error('Please use valid color names (e.g., blue, sunset, forest, ocean, ruby)');
      return;
    }
    
    isAI ? setAiLoading(true) : setLoading(true);
    
    try {
      let aiPalettes: ColorPalette[] = [];
      
      if (prompt) {
        aiPalettes = await generateAIBasedPalettes(prompt, paletteType || selectedType);
        setShowMore(true);
        setPalettes(prev => [...aiPalettes, ...prev.filter(p => !p.isAI)]);
      } else {
        aiPalettes = await generateRandomPalettes();
        setPalettes(aiPalettes);
      }
      
      toast.success(isAI ? `Generated ${aiPalettes.length} palettes from "${prompt}"!` : `Generated ${aiPalettes.length} random palettes!`);
    } catch (error) {
      toast.error('Failed to generate palettes');
      console.error('Palette generation error:', error);
    }
    
    isAI ? setAiLoading(false) : setLoading(false);
  };

  // Validate color-related input - more strict validation
  const isValidColorPrompt = (prompt: string): boolean => {
    const words = prompt.toLowerCase().split(/\s+/);
    return words.some(word => colorDatabase[word] !== undefined);
  };

  // Get exact color from prompt
  const getExactColorFromPrompt = (prompt: string): { hex: string; hue: number; saturation: number; lightness: number } | null => {
    const words = prompt.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (colorDatabase[word]) {
        return colorDatabase[word];
      }
    }
    return null;
  };

  // AI-based palette generation with accurate colors
  const generateAIBasedPalettes = async (prompt: string, type: ColorPalette['type']): Promise<ColorPalette[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const baseColorData = getExactColorFromPrompt(prompt);
    if (!baseColorData) {
      return [];
    }

    setBaseHue(baseColorData.hue);
    const generatedPalettes: ColorPalette[] = [];
    const variationTypes: ColorPalette['type'][] = ['complementary', 'monochrome', 'shades', 'triad', 'split-complementary', 'analogous'];
    
    for (let i = 0; i < 6; i++) {
      const variationType = variationTypes[i];
      const colors = generateAccuratePalette(baseColorData, variationType);
      
      generatedPalettes.push({
        id: `ai-${Date.now()}-${i}`,
        name: `${prompt.charAt(0).toUpperCase() + prompt.slice(1)} ${variationType}`,
        colors,
        type: variationType,
        isAI: true
      });
    }
    
    return generatedPalettes;
  };

  // Generate accurate palette from base color with improved color theory
  const generateAccuratePalette = (
    baseColor: { hex: string; hue: number; saturation: number; lightness: number },
    type: ColorPalette['type']
  ): string[] => {
    const { hue, saturation, lightness } = baseColor;
    const colors: string[] = [];
    
    switch (type) {
      case 'monochrome':
        // More refined monochromatic scale with better distribution
        colors.push(hslToHex(hue, Math.min(100, saturation + 10), Math.max(10, lightness - 30)));
        colors.push(hslToHex(hue, saturation, Math.max(20, lightness - 15)));
        colors.push(hslToHex(hue, saturation, lightness));
        colors.push(hslToHex(hue, Math.max(20, saturation - 10), Math.min(85, lightness + 15)));
        colors.push(hslToHex(hue, Math.max(10, saturation - 20), Math.min(95, lightness + 30)));
        break;
      case 'complementary':
        // True complementary with accent colors
        const compHue = (hue + 180) % 360;
        colors.push(hslToHex(hue, saturation, lightness));
        colors.push(hslToHex(compHue, saturation, lightness));
        colors.push(hslToHex(hue, Math.max(30, saturation - 15), Math.min(80, lightness + 15)));
        colors.push(hslToHex(compHue, Math.max(30, saturation - 15), Math.min(80, lightness + 15)));
        colors.push(hslToHex((hue + 90) % 360, Math.max(20, saturation - 30), Math.min(90, lightness + 20)));
        break;
      case 'triad':
        // Triadic harmony with balanced distribution
        colors.push(hslToHex(hue, saturation, lightness));
        colors.push(hslToHex((hue + 120) % 360, saturation, lightness));
        colors.push(hslToHex((hue + 240) % 360, saturation, lightness));
        colors.push(hslToHex(hue, Math.max(25, saturation - 20), Math.min(85, lightness + 15)));
        colors.push(hslToHex((hue + 180) % 360, Math.max(25, saturation - 25), Math.min(90, lightness + 20)));
        break;
      case 'shades':
        // Shades from dark to light with consistent saturation
        for (let i = 0; i < 5; i++) {
          const l = Math.max(10, Math.min(90, 15 + i * 18));
          const s = Math.max(40, saturation - (i * 5));
          colors.push(hslToHex(hue, s, l));
        }
        break;
      case 'split-complementary':
        // Split-complementary: base color + two colors adjacent to its complement
        const splitComp1 = (hue + 150) % 360;
        const splitComp2 = (hue + 210) % 360;
        colors.push(hslToHex(hue, saturation, lightness));
        colors.push(hslToHex(splitComp1, saturation, lightness));
        colors.push(hslToHex(splitComp2, saturation, lightness));
        colors.push(hslToHex(hue, Math.max(30, saturation - 20), Math.min(85, lightness + 20)));
        colors.push(hslToHex((hue + 180) % 360, Math.max(20, saturation - 30), Math.min(90, lightness + 25)));
        break;
      case 'analogous':
        // Analogous: colors adjacent on the color wheel
        colors.push(hslToHex((hue - 30 + 360) % 360, saturation, lightness));
        colors.push(hslToHex((hue - 15 + 360) % 360, saturation, lightness));
        colors.push(hslToHex(hue, saturation, lightness));
        colors.push(hslToHex((hue + 15) % 360, saturation, lightness));
        colors.push(hslToHex((hue + 30) % 360, saturation, lightness));
        break;
    }
    
    return colors;
  };

  // Generate random palettes
  const generateRandomPalettes = async (): Promise<ColorPalette[]> => {
    const palettes: ColorPalette[] = [];
    const types: ColorPalette['type'][] = ['monochrome', 'triad', 'complementary', 'shades', 'split-complementary', 'analogous'];
    const colorNames = Object.keys(colorDatabase).slice(0, 20);
    
    for (let i = 0; i < 6; i++) {
      const randomColorName = colorNames[Math.floor(Math.random() * colorNames.length)];
      const colorData = colorDatabase[randomColorName];
      const randomType = types[i % types.length];
      const colors = generateAccuratePalette(colorData, randomType);
      
      palettes.push({
        id: `random-${Date.now()}-${i}`,
        name: `${randomColorName.charAt(0).toUpperCase() + randomColorName.slice(1)} ${randomType}`,
        colors,
        type: randomType
      });
    }
    
    return palettes;
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
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  };

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      toast.success(`Copied ${color}`);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const getColorFormats = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return {
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
    };
  };

  useEffect(() => {
    setPalettes(samplePalettes);
  }, []);

  return (
    <section id="palettes" className="py-20 px-6 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header with slide-in */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={slideUpVariants}
          custom={0}
        >
          <motion.div 
            className="inline-flex items-center gap-2 glass-nav mb-6"
            variants={slideInVariants}
            custom={1}
          >
            <Palette className="w-5 h-5 text-primary" />
            <span className="font-medium">Color Palettes</span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
            variants={slideUpVariants}
            custom={2}
          >
            Infinite Color Inspiration
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={slideUpVariants}
            custom={3}
          >
            Discover beautiful color combinations with precise color theory
          </motion.p>
        </motion.div>

        {/* Color Harmony Visualization & AI Generation */}
        <div ref={toolsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* AI Color Generation - Slide in from left */}
          <motion.div
            initial="hidden"
            animate={isToolsInView ? "visible" : "hidden"}
            variants={slideInVariants}
            custom={0}
          >
            <div className="glass-card h-full">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">AI Color Generation</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <Input
                  placeholder="Enter a color name (e.g., blue, sunset, emerald)"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="bg-background/50 border-white/20"
                />
                
                <Select value={selectedType} onValueChange={(value: ColorPalette['type']) => setSelectedType(value)}>
                  <SelectTrigger className="bg-background/50 border-white/20">
                    <SelectValue placeholder="Palette type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monochrome">Monochrome</SelectItem>
                    <SelectItem value="complementary">Complementary</SelectItem>
                    <SelectItem value="triad">Triad</SelectItem>
                    <SelectItem value="shades">Shades</SelectItem>
                    <SelectItem value="split-complementary">Split-Complementary</SelectItem>
                    <SelectItem value="analogous">Analogous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => generateAIPalettes(aiPrompt, selectedType)}
                  disabled={aiLoading || !aiPrompt.trim()}
                  className="btn-primary"
                  {...hoverAnimations.magnetLift}
                >
                  {aiLoading ? <Wand2 className="w-5 h-5 mr-2 animate-pulse" /> : <Wand2 className="w-5 h-5 mr-2" />}
                  Generate Palette
                </Button>
                
                <Button onClick={() => generateAIPalettes()} disabled={loading} className="btn-glass">
                  {loading ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <RefreshCw className="w-5 h-5 mr-2" />}
                  Random Palettes
                </Button>
              </div>

              {/* Quick color suggestions */}
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Try these colors:</p>
                <div className="flex flex-wrap gap-2">
                  {['ocean', 'sunset', 'forest', 'ruby', 'gold', 'lavender'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setAiPrompt(color)}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Color Harmony Wheel - Slide in from right */}
          <motion.div
            initial="hidden"
            animate={isToolsInView ? "visible" : "hidden"}
            variants={slideInRightVariants}
            custom={1}
          >
            <div className="glass-card h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Circle className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Color Harmony Guide</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowComparison(true)}
                  className="gap-2"
                >
                  <GitCompare className="w-4 h-4" />
                  Compare
                </Button>
              </div>
              <ColorHarmonyWheel selectedType={selectedType} baseHue={baseHue} />
            </div>
          </motion.div>
        </div>

        {/* Palettes Grid with slide-up reveal */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedPalettes.map((palette, index) => (
            <motion.div
              key={palette.id}
              initial="hidden"
              animate={isGridInView ? "visible" : "hidden"}
              variants={slideUpVariants}
              custom={index}
            >
              <ParallaxCard offset={30}>
                <Interactive3DCard>
                  <div className="group relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-4 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-500 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-glow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4 gap-2">
                        <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors flex-1">
                          {palette.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground bg-background/20 px-2 py-0.5 rounded-full">
                            {palette.type}
                          </span>
                          
                          {/* Export dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="p-1 h-auto">
                                <Download className="w-3 h-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => exportAsPNG(palette)}>
                                <Image className="w-4 h-4 mr-2" />
                                Export as PNG
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => exportAsCSS(palette)}>
                                <FileCode className="w-4 h-4 mr-2" />
                                Export as CSS
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => exportAsJSON(palette)}>
                                <FileJson className="w-4 h-4 mr-2" />
                                Export as JSON
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (isBookmarked('palette', palette.id)) {
                                removeBookmark('palette', palette.id);
                              } else {
                                addBookmark('palette', palette.id, palette);
                              }
                            }}
                            className="p-1 h-auto"
                          >
                            {isBookmarked('palette', palette.id) ? (
                              <BookmarkCheck className="w-3 h-3 fill-current" />
                            ) : (
                              <Bookmark className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-1 mb-3">
                        {palette.colors.map((color, colorIndex) => (
                          <motion.div
                            key={colorIndex}
                            className="relative group/color cursor-pointer overflow-hidden rounded-lg"
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyColor(color)}
                          >
                            <div
                              className="w-full h-12 rounded-lg shadow-lg"
                              style={{ backgroundColor: color }}
                            />
                            <motion.div 
                              className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              {copiedColor === color ? (
                                <Check className="w-3 h-3 text-green-400" />
                              ) : (
                                <Copy className="w-3 h-3 text-white" />
                              )}
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="text-xs font-mono text-muted-foreground truncate">
                        {palette.colors[0]}
                      </div>
                    </div>
                  </div>
                </Interactive3DCard>
              </ParallaxCard>
            </motion.div>
          ))}
        </div>

        {/* View More Button with slide-up */}
        <motion.div
          className="text-center mt-8"
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          variants={slideUpVariants}
          custom={displayedPalettes.length + 1}
        >
          <Button 
            onClick={() => setShowMore(!showMore)}
            className="btn-glass hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
          >
            <span className="mr-2">{showMore ? 'Show Less' : 'View More'} Palettes</span>
            {showMore ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            )}
          </Button>
        </motion.div>

        {/* 3D Color Sphere and Image Palette Extractor */}
        <motion.div
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideUpVariants}
          custom={0}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
              variants={slideUpVariants}
              custom={1}
            >
              Color Exploration Tools
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              variants={slideUpVariants}
              custom={2}
            >
              Interactive tools to discover and extract perfect color harmonies
            </motion.p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInVariants}
              custom={0}
            >
              <ColorSphere3D />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRightVariants}
              custom={1}
            >
              <ImagePaletteExtractor />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Palette Comparison Modal */}
      <PaletteComparison 
        palettes={palettes} 
        isOpen={showComparison} 
        onClose={() => setShowComparison(false)} 
      />
    </section>
  );
};

export default ColorPalettes;
