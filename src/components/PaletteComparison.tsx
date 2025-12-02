import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeftRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  type: 'monochrome' | 'triad' | 'complementary' | 'shades';
  isAI?: boolean;
}

interface PaletteComparisonProps {
  palettes: ColorPalette[];
  isOpen: boolean;
  onClose: () => void;
}

const PaletteComparison = ({ palettes, isOpen, onClose }: PaletteComparisonProps) => {
  const [selectedPalettes, setSelectedPalettes] = useState<[ColorPalette | null, ColorPalette | null]>([null, null]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleSelectPalette = (palette: ColorPalette, slot: 0 | 1) => {
    setSelectedPalettes(prev => {
      const newSelection = [...prev] as [ColorPalette | null, ColorPalette | null];
      newSelection[slot] = palette;
      return newSelection;
    });
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

  const clearSelection = (slot: 0 | 1) => {
    setSelectedPalettes(prev => {
      const newSelection = [...prev] as [ColorPalette | null, ColorPalette | null];
      newSelection[slot] = null;
      return newSelection;
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="glass-card max-w-5xl w-full max-h-[90vh] overflow-auto p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Palette Comparison
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Comparison Area */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[0, 1].map((slot) => (
              <motion.div
                key={slot}
                className="glass p-4 rounded-xl min-h-[200px]"
                layout
              >
                {selectedPalettes[slot as 0 | 1] ? (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">{selectedPalettes[slot as 0 | 1]?.name}</h3>
                      <Button variant="ghost" size="sm" onClick={() => clearSelection(slot as 0 | 1)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {selectedPalettes[slot as 0 | 1]?.colors.map((color, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 h-24 rounded-lg cursor-pointer relative group"
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => copyColor(color)}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 rounded-lg transition-opacity">
                            {copiedColor === color ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                          </div>
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 text-white drop-shadow-lg">
                            {color}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 capitalize">
                      Type: {selectedPalettes[slot as 0 | 1]?.type}
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p>Select palette {slot + 1}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Swap Button */}
          {selectedPalettes[0] && selectedPalettes[1] && (
            <div className="flex justify-center mb-6">
              <Button
                variant="outline"
                onClick={() => setSelectedPalettes([selectedPalettes[1], selectedPalettes[0]])}
                className="gap-2"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Swap
              </Button>
            </div>
          )}

          {/* Palette Selection Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Palettes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-[300px] overflow-auto">
              {palettes.map((palette) => (
                <motion.div
                  key={palette.id}
                  className="glass p-3 rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex gap-1 h-12 mb-2 rounded overflow-hidden">
                    {palette.colors.map((color, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <p className="text-xs font-medium truncate mb-2">{palette.name}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 text-xs h-7"
                      onClick={() => handleSelectPalette(palette, 0)}
                      disabled={selectedPalettes[0]?.id === palette.id}
                    >
                      Slot 1
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 text-xs h-7"
                      onClick={() => handleSelectPalette(palette, 1)}
                      disabled={selectedPalettes[1]?.id === palette.id}
                    >
                      Slot 2
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaletteComparison;
