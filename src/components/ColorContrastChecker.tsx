import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Type, Contrast } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(...hexToRgb(hex1));
  const l2 = relativeLuminance(...hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

type WCAGLevel = 'AAA' | 'AA' | 'Fail';

function getWCAGLevel(ratio: number, isLargeText: boolean): WCAGLevel {
  if (isLargeText) {
    if (ratio >= 4.5) return 'AAA';
    if (ratio >= 3) return 'AA';
    return 'Fail';
  }
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'Fail';
}

const LevelBadge = ({ level }: { level: WCAGLevel }) => {
  if (level === 'AAA') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-400">
      <CheckCircle className="w-3 h-3" /> AAA
    </span>
  );
  if (level === 'AA') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-yellow-500/20 text-yellow-400">
      <AlertTriangle className="w-3 h-3" /> AA
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400">
      <XCircle className="w-3 h-3" /> Fail
    </span>
  );
};

const ColorContrastChecker = () => {
  const [fg, setFg] = useState('#FFFFFF');
  const [bg, setBg] = useState('#1A1A2E');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const isValidHex = (h: string) => /^#[0-9A-Fa-f]{6}$/.test(h);
  const valid = isValidHex(fg) && isValidHex(bg);
  const ratio = valid ? contrastRatio(fg, bg) : 0;
  const normalLevel = valid ? getWCAGLevel(ratio, false) : 'Fail';
  const largeLevel = valid ? getWCAGLevel(ratio, true) : 'Fail';

  const swap = () => {
    setFg(bg);
    setBg(fg);
  };

  return (
    <div ref={ref}>
      <motion.div
        variants={slideUpVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0}
      >
        <Card className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Contrast className="w-5 h-5 text-primary" />
            Color Contrast Checker
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Foreground (Text)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={isValidHex(fg) ? fg : '#FFFFFF'}
                  onChange={e => setFg(e.target.value.toUpperCase())}
                  className="w-10 h-10 rounded cursor-pointer border-0"
                />
                <Input
                  value={fg}
                  onChange={e => setFg(e.target.value.toUpperCase())}
                  className="font-mono bg-background/50"
                  maxLength={7}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Background</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={isValidHex(bg) ? bg : '#000000'}
                  onChange={e => setBg(e.target.value.toUpperCase())}
                  className="w-10 h-10 rounded cursor-pointer border-0"
                />
                <Input
                  value={bg}
                  onChange={e => setBg(e.target.value.toUpperCase())}
                  className="font-mono bg-background/50"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          <button
            onClick={swap}
            className="text-xs text-primary hover:underline mb-4 block"
          >
            ↕ Swap colors
          </button>

          {/* Preview */}
          <div
            className="rounded-lg p-6 mb-6 border border-white/10"
            style={{ backgroundColor: isValidHex(bg) ? bg : '#000' }}
          >
            <p style={{ color: isValidHex(fg) ? fg : '#fff', fontSize: 24, fontWeight: 700 }}>
              Large Text (24px bold)
            </p>
            <p style={{ color: isValidHex(fg) ? fg : '#fff', fontSize: 16 }}>
              Normal body text at 16px — The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          {/* Results */}
          {valid && (
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-2xl font-bold">{ratio.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">Contrast Ratio</div>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <div className="mb-1"><LevelBadge level={normalLevel} /></div>
                <div className="text-xs text-muted-foreground">Normal Text</div>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <div className="mb-1"><LevelBadge level={largeLevel} /></div>
                <div className="text-xs text-muted-foreground">Large Text</div>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ColorContrastChecker;
