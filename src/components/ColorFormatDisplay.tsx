import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { toast } from 'sonner';

type ColorFormat = 'HEX' | 'RGB' | 'HSL' | 'CMYK';

interface ColorFormatDisplayProps {
  hex: string;
}

const formatDescriptions: Record<ColorFormat, string> = {
  HEX: 'Hexadecimal — web standard (#RRGGBB)',
  RGB: 'Red, Green, Blue — screen color model (0–255)',
  HSL: 'Hue, Saturation, Lightness — intuitive color model',
  CMYK: 'Cyan, Magenta, Yellow, Key — print color model',
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 10000) / 100 };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return {
    h: Math.round(h * 36000) / 100,
    s: Math.round(s * 10000) / 100,
    l: Math.round(l * 10000) / 100,
  };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  const c = (1 - rr - k) / (1 - k);
  const m = (1 - gg - k) / (1 - k);
  const y = (1 - bb - k) / (1 - k);
  return {
    c: Math.round(c * 10000) / 100,
    m: Math.round(m * 10000) / 100,
    y: Math.round(y * 10000) / 100,
    k: Math.round(k * 10000) / 100,
  };
}

function getFormatValue(hex: string, format: ColorFormat): string {
  const { r, g, b } = hexToRgb(hex);
  switch (format) {
    case 'HEX': return hex.toUpperCase();
    case 'RGB': return `rgb(${r}, ${g}, ${b})`;
    case 'HSL': {
      const { h, s, l } = rgbToHsl(r, g, b);
      return `hsl(${h}°, ${s}%, ${l}%)`;
    }
    case 'CMYK': {
      const { c, m, y, k } = rgbToCmyk(r, g, b);
      return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
    }
  }
}

const ColorFormatDisplay = ({ hex }: ColorFormatDisplayProps) => {
  const [activeFormat, setActiveFormat] = useState<ColorFormat>('HEX');
  const [copied, setCopied] = useState(false);
  const formats: ColorFormat[] = ['HEX', 'RGB', 'HSL', 'CMYK'];
  const value = getFormatValue(hex, activeFormat);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`Copied ${value}`);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-1.5">
        {/* Format toggle */}
        <div className="flex gap-0.5 bg-background/30 rounded-md p-0.5">
          {formats.map((f) => (
            <Tooltip key={f}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveFormat(f)}
                  className={`flex-1 text-[9px] font-mono font-medium py-0.5 rounded transition-all duration-200 ${
                    activeFormat === f
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs max-w-[200px]">
                {formatDescriptions[f]}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Value display */}
        <div
          className="group relative flex items-center gap-1 cursor-pointer rounded-md px-1.5 py-1 hover:bg-primary/10 transition-colors"
          onClick={handleCopy}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`${hex}-${activeFormat}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-mono text-muted-foreground truncate flex-1"
            >
              {value}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex-shrink-0"
              >
                <Check className="w-3 h-3 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy className="w-3 h-3 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ColorFormatDisplay;
