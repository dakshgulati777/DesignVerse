import { motion } from 'framer-motion';
import { useState } from 'react';

interface ColorHarmonyWheelProps {
  selectedType: 'monochrome' | 'triad' | 'complementary' | 'shades';
  baseHue?: number;
}

const ColorHarmonyWheel = ({ selectedType, baseHue = 0 }: ColorHarmonyWheelProps) => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const generateWheelColors = () => {
    const colors = [];
    for (let i = 0; i < 12; i++) {
      const hue = (i * 30 + baseHue) % 360;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const wheelColors = generateWheelColors();

  const getHighlightedSegments = () => {
    const baseIndex = Math.floor(baseHue / 30) % 12;
    switch (selectedType) {
      case 'complementary':
        return [baseIndex, (baseIndex + 6) % 12];
      case 'triad':
        return [baseIndex, (baseIndex + 4) % 12, (baseIndex + 8) % 12];
      case 'monochrome':
        return [baseIndex];
      case 'shades':
        return [baseIndex];
      default:
        return [];
    }
  };

  const highlightedSegments = getHighlightedSegments();

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
      default:
        return '';
    }
  };

  return (
    <div className="relative">
      <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto">
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
        {wheelColors.map((color, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
          const isHighlighted = highlightedSegments.includes(i);
          
          const x1 = 100 + 80 * Math.cos(angle);
          const y1 = 100 + 80 * Math.sin(angle);
          const x2 = 100 + 80 * Math.cos(nextAngle);
          const y2 = 100 + 80 * Math.sin(nextAngle);
          
          return (
            <motion.path
              key={i}
              d={`M100,100 L${x1},${y1} A80,80 0 0,1 ${x2},${y2} Z`}
              fill={color}
              stroke={isHighlighted ? 'white' : 'transparent'}
              strokeWidth={isHighlighted ? 3 : 0}
              filter={isHighlighted ? 'url(#glow)' : undefined}
              animate={{
                scale: isHighlighted ? 1.02 : 1,
                opacity: isHighlighted ? 1 : 0.6,
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
        <circle cx="100" cy="100" r="30" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="2" />
        
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
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
              );
            })}
          </motion.g>
        )}
        
        {/* Type indicator */}
        <text x="100" y="105" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">
          {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
        </text>
      </svg>
      
      <motion.p
        key={selectedType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-muted-foreground text-sm mt-4 max-w-xs mx-auto"
      >
        {getHarmonyDescription()}
      </motion.p>
    </div>
  );
};

export default ColorHarmonyWheel;
