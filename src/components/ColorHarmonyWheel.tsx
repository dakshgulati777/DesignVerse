import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface ColorHarmonyWheelProps {
  selectedType: 'monochrome' | 'triad' | 'complementary' | 'shades' | 'split-complementary' | 'analogous';
  baseHue?: number;
  onHueChange?: (hue: number) => void;
}

const ColorHarmonyWheel = ({ selectedType, baseHue = 0, onHueChange }: ColorHarmonyWheelProps) => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const generateWheelColors = () => {
    const colors = [];
    for (let i = 0; i < 12; i++) {
      const hue = (i * 30) % 360;
      colors.push({ hue, color: `hsl(${hue}, 70%, 50%)` });
    }
    return colors;
  };

  const wheelColors = generateWheelColors();

  const getHighlightedSegments = () => {
    const baseIndex = Math.round(baseHue / 30) % 12;
    switch (selectedType) {
      case 'complementary':
        return [baseIndex, (baseIndex + 6) % 12];
      case 'triad':
        return [baseIndex, (baseIndex + 4) % 12, (baseIndex + 8) % 12];
      case 'monochrome':
        return [baseIndex];
      case 'shades':
        return [baseIndex];
      case 'split-complementary':
        return [baseIndex, (baseIndex + 5) % 12, (baseIndex + 7) % 12];
      case 'analogous':
        return [(baseIndex - 1 + 12) % 12, baseIndex, (baseIndex + 1) % 12];
      default:
        return [];
    }
  };

  const highlightedSegments = getHighlightedSegments();

  const getHarmonyColors = (): { color: string; label: string }[] => {
    const baseIndex = Math.round(baseHue / 30) % 12;
    switch (selectedType) {
      case 'complementary':
        return [
          { color: `hsl(${baseHue}, 70%, 50%)`, label: 'Base' },
          { color: `hsl(${(baseHue + 180) % 360}, 70%, 50%)`, label: 'Complement' },
        ];
      case 'triad':
        return [
          { color: `hsl(${baseHue}, 70%, 50%)`, label: 'Base' },
          { color: `hsl(${(baseHue + 120) % 360}, 70%, 50%)`, label: 'Triad 2' },
          { color: `hsl(${(baseHue + 240) % 360}, 70%, 50%)`, label: 'Triad 3' },
        ];
      case 'monochrome':
        return [
          { color: `hsl(${baseHue}, 70%, 30%)`, label: 'Dark' },
          { color: `hsl(${baseHue}, 70%, 50%)`, label: 'Base' },
          { color: `hsl(${baseHue}, 50%, 65%)`, label: 'Medium' },
          { color: `hsl(${baseHue}, 30%, 80%)`, label: 'Light' },
        ];
      case 'shades':
        return [
          { color: `hsl(${baseHue}, 70%, 20%)`, label: 'Darkest' },
          { color: `hsl(${baseHue}, 70%, 35%)`, label: 'Dark' },
          { color: `hsl(${baseHue}, 70%, 50%)`, label: 'Base' },
          { color: `hsl(${baseHue}, 70%, 65%)`, label: 'Light' },
          { color: `hsl(${baseHue}, 70%, 80%)`, label: 'Lightest' },
        ];
      case 'split-complementary':
        return [
          { color: `hsl(${baseHue}, 70%, 50%)`, label: 'Base' },
          { color: `hsl(${(baseHue + 150) % 360}, 70%, 50%)`, label: 'Split 1' },
          { color: `hsl(${(baseHue + 210) % 360}, 70%, 50%)`, label: 'Split 2' },
        ];
      case 'analogous':
        return [
          { color: `hsl(${(baseHue - 30 + 360) % 360}, 70%, 50%)`, label: 'Warm' },
          { color: `hsl(${baseHue}, 70%, 50%)`, label: 'Base' },
          { color: `hsl(${(baseHue + 30) % 360}, 70%, 50%)`, label: 'Cool' },
        ];
      default:
        return [];
    }
  };

  const getHarmonyDescription = () => {
    switch (selectedType) {
      case 'complementary':
        return 'Complementary colors are opposite on the wheel, creating high contrast and visual tension.';
      case 'triad':
        return 'Triadic colors are evenly spaced (120°), offering balanced, vibrant combinations.';
      case 'monochrome':
        return 'Monochromatic uses one hue with varying saturation and lightness for cohesive designs.';
      case 'shades':
        return 'Shades vary the lightness of one color from dark to light, creating depth.';
      case 'split-complementary':
        return 'Split-complementary uses colors adjacent to the complement for high contrast with less tension.';
      case 'analogous':
        return 'Analogous colors are neighbors on the wheel, creating harmonious and serene combinations.';
      default:
        return '';
    }
  };

  const handleWheelInteraction = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!onHueChange) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    onHueChange(Math.round(angle) % 360);
  }, [onHueChange]);

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const harmonyColors = getHarmonyColors();

  return (
    <div className="relative space-y-6">
      <svg
        viewBox="0 0 200 200"
        className={`w-full max-w-[300px] mx-auto ${onHueChange ? 'cursor-crosshair' : ''}`}
        onMouseDown={(e) => { setIsDragging(true); handleWheelInteraction(e); }}
        onMouseMove={(e) => { if (isDragging) handleWheelInteraction(e); }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Wheel segments */}
        {wheelColors.map(({ hue, color }, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
          const isHighlighted = highlightedSegments.includes(i);
          const isHovered = hoveredSegment === i;
          
          const x1 = 100 + 80 * Math.cos(angle);
          const y1 = 100 + 80 * Math.sin(angle);
          const x2 = 100 + 80 * Math.cos(nextAngle);
          const y2 = 100 + 80 * Math.sin(nextAngle);
          
          return (
            <motion.path
              key={i}
              d={`M100,100 L${x1},${y1} A80,80 0 0,1 ${x2},${y2} Z`}
              fill={color}
              stroke={isHighlighted ? 'white' : isHovered ? 'white' : 'transparent'}
              strokeWidth={isHighlighted ? 3 : isHovered ? 2 : 0}
              filter={isHighlighted ? 'url(#glow)' : undefined}
              animate={{
                scale: isHighlighted ? 1.02 : 1,
                opacity: isHighlighted ? 1 : isHovered ? 0.9 : 0.6,
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredSegment(i)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="cursor-pointer transition-all"
              whileHover={{ scale: 1.05 }}
            />
          );
        })}
        
        {/* Center circle */}
        <circle cx="100" cy="100" r="30" fill={`hsl(${baseHue}, 70%, 50%)`} stroke="white" strokeWidth="2" />
        
        {/* Connection lines */}
        {highlightedSegments.length > 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {highlightedSegments.map((segment, i) => {
              const nextSegment = highlightedSegments[(i + 1) % highlightedSegments.length];
              const angle1 = (segment * 30 + 15 - 90) * (Math.PI / 180);
              const angle2 = (nextSegment * 30 + 15 - 90) * (Math.PI / 180);
              const x1 = 100 + 50 * Math.cos(angle1);
              const y1 = 100 + 50 * Math.sin(angle1);
              const x2 = 100 + 50 * Math.cos(angle2);
              const y2 = 100 + 50 * Math.sin(angle2);
              
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="white" strokeWidth="2" strokeDasharray="4,4" opacity="0.6"
                />
              );
            })}
          </motion.g>
        )}

        {/* Hue indicator */}
        {onHueChange && (() => {
          const indicatorAngle = (baseHue - 90) * (Math.PI / 180);
          const ix = 100 + 75 * Math.cos(indicatorAngle);
          const iy = 100 + 75 * Math.sin(indicatorAngle);
          return (
            <circle cx={ix} cy={iy} r="6" fill="white" stroke="hsl(var(--foreground))" strokeWidth="2" className="pointer-events-none" />
          );
        })()}
        
        {/* Type indicator */}
        <text x="100" y="103" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
          {Math.round(baseHue)}°
        </text>
      </svg>

      {/* Hue slider */}
      {onHueChange && (
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Base Hue: {Math.round(baseHue)}°</label>
          <input
            type="range"
            min="0"
            max="359"
            value={baseHue}
            onChange={(e) => onHueChange(parseInt(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${Array.from({ length: 12 }, (_, i) => `hsl(${i * 30}, 70%, 50%)`).join(', ')})`,
            }}
          />
        </div>
      )}

      {/* Generated harmony colors */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Generated Palette</h4>
        <div className="flex flex-wrap gap-2">
          {harmonyColors.map(({ color, label }, i) => (
            <motion.button
              key={`${selectedType}-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => copyColor(color)}
              className="group flex flex-col items-center gap-1"
              title={`Copy ${color}`}
            >
              <div
                className="w-12 h-12 border-2 border-foreground/10 group-hover:border-foreground/40 transition-colors relative"
                style={{ backgroundColor: color }}
              >
                {copiedColor === color && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <motion.p
        key={selectedType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-muted-foreground text-sm max-w-xs mx-auto"
      >
        {getHarmonyDescription()}
      </motion.p>
    </div>
  );
};

export default ColorHarmonyWheel;
