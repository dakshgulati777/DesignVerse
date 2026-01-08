import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Type, Sparkles, RotateCcw, Move, Loader2, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface TextElement {
  id: string;
  text: string;
  font: string;
  fontSize: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
}

const availableFonts = [
  // Sans Serif
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Inter', 'Raleway', 'Ubuntu', 
  'Nunito', 'Work Sans', 'Rubik', 'Quicksand', 'Josefin Sans', 'DM Sans', 'Space Grotesk',
  'Manrope', 'Outfit', 'Urbanist', 'Plus Jakarta Sans', 'Lexend', 'Figtree', 'Sora',
  // Serif
  'Merriweather', 'Playfair Display', 'Lora', 'PT Serif', 'Crimson Text', 'Libre Baskerville',
  'Cormorant Garamond', 'EB Garamond', 'Spectral', 'Bodoni Moda', 'Fraunces', 'Alegreya',
  // Display
  'Abril Fatface', 'Bebas Neue', 'Righteous', 'Anton', 'Cinzel', 'Oswald', 'Alfa Slab One',
  'Bungee', 'Teko', 'Russo One', 'Staatliches', 'Archivo Black', 'Big Shoulders Display',
  // Handwriting & Script
  'Dancing Script', 'Caveat', 'Great Vibes', 'Kaushan Script', 'Indie Flower', 'Patrick Hand',
  'Sacramento', 'Shadows Into Light', 'Alex Brush', 'Pacifico', 'Lobster', 'Satisfy',
  // Cartoon & Decorative
  'Bangers', 'Permanent Marker', 'Fredoka One', 'Bubblegum Sans', 'Comic Neue', 'Chewy',
  'Luckiest Guy', 'Titan One', 'Cherry Bomb One', 'Amatic SC', 'Shrikhand',
  // Tech & Retro
  'Orbitron', 'Press Start 2P', 'VT323', 'Rajdhani', 'Exo 2', 'Saira', 'Titillium Web',
  'Oxanium', 'Audiowide', 'Electrolize', 'Chakra Petch', 'Syncopate',
  // Elegant & Gothic
  'Marcellus', 'Cormorant', 'Forum', 'Poiret One', 'Jura', 'Gilda Display',
  'UnifrakturMaguntia', 'IM Fell English', 'Pirata One', 'Creepster',
  // Bold & Condensed
  'Black Ops One', 'Ultra', 'Passion One', 'Bevan', 'Lilita One',
  'Roboto Condensed', 'Barlow Condensed', 'Fjalla One', 'Pathway Gothic One',
  // Monospace
  'Source Code Pro', 'Roboto Mono', 'Fira Code', 'JetBrains Mono', 'Space Mono', 'IBM Plex Mono'
];

const FontPlayground = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<TextElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    score: number;
    breakdown?: {
      fontPairing: number;
      hierarchy: number;
      spacing: number;
      readability: number;
    };
    feedback: string[];
    suggestions: string[];
    pairingTips?: string[];
  } | null>(null);

  // Load web fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${availableFonts.map(f => f.replace(/ /g, '+')).join('&family=')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const addElement = useCallback(() => {
    const newElement: TextElement = {
      id: `elem-${Date.now()}`,
      text: 'Your Text Here',
      font: availableFonts[Math.floor(Math.random() * availableFonts.length)],
      fontSize: 32,
      x: 50 + Math.random() * 200,
      y: 50 + Math.random() * 200,
      color: '#ffffff',
      rotation: 0
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
    toast.success('Text element added!');
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<TextElement>) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  }, []);

  const removeElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) setSelectedElement(null);
    toast.success('Element removed');
  }, [selectedElement]);

  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    setSelectedElement(elementId);
    setIsDragging(true);
    const element = elements.find(el => el.id === elementId);
    if (element && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y
      });
    }
  }, [elements]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(rect.width - 100, e.clientX - rect.left - dragOffset.x));
    const newY = Math.max(0, Math.min(rect.height - 50, e.clientY - rect.top - dragOffset.y));
    updateElement(selectedElement, { x: newX, y: newY });
  }, [isDragging, selectedElement, dragOffset, updateElement]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const analyzeLayout = async () => {
    if (elements.length < 2) {
      toast.error('Add at least 2 text elements to analyze');
      return;
    }

    setIsAnalyzing(true);
    setAiAnalysis(null);

    try {
      const layoutData = elements.map(el => ({
        font: el.font,
        fontSize: el.fontSize,
        position: { x: el.x, y: el.y },
        text: el.text,
        rotation: el.rotation
      }));

      const { data, error } = await supabase.functions.invoke('analyze-typography', {
        body: { layout: layoutData }
      });

      if (error) {
        if (error.message?.includes('429')) {
          toast.error('Rate limit exceeded. Please try again later.');
        } else if (error.message?.includes('402')) {
          toast.error('AI credits exhausted. Please add more credits.');
        } else {
          throw error;
        }
        return;
      }

      setAiAnalysis(data);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze layout. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetCanvas = useCallback(() => {
    setElements([]);
    setSelectedElement(null);
    setAiAnalysis(null);
    toast.success('Canvas cleared');
  }, []);

  const selectedEl = elements.find(el => el.id === selectedElement);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Type className="w-6 h-6" />
                  Font Playground
                </h1>
                <p className="text-sm text-muted-foreground">Create layouts & get AI analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetCanvas}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button 
                onClick={analyzeLayout} 
                disabled={isAnalyzing || elements.length < 2}
                className="bg-primary hover:bg-primary/90"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isAnalyzing ? 'Analyzing...' : 'AI Analyze'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="glass-card overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-sm font-medium">Canvas</span>
                <Button size="sm" variant="outline" onClick={addElement}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Text
                </Button>
              </div>
              <div
                ref={canvasRef}
                className="relative w-full h-[500px] bg-black/20 cursor-crosshair overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={() => setSelectedElement(null)}
              >
                {/* Grid overlay */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}
                />
                
                {elements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Type className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Add Text" to start creating</p>
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {elements.map((element) => (
                    <motion.div
                      key={element.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`absolute cursor-move select-none ${
                        selectedElement === element.id 
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                          : ''
                      }`}
                      style={{
                        left: element.x,
                        top: element.y,
                        fontFamily: `'${element.font}', sans-serif`,
                        fontSize: `${element.fontSize}px`,
                        color: element.color,
                        transform: `rotate(${element.rotation}deg)`,
                        transformOrigin: 'center'
                      }}
                      onMouseDown={(e) => handleMouseDown(e, element.id)}
                    >
                      <div className="flex items-center gap-1">
                        <Move className="w-3 h-3 opacity-30" />
                        <span>{element.text}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Card>

            {/* AI Analysis Results */}
            <AnimatePresence>
              {aiAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="glass-card mt-6 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        AI Typography Analysis
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Score:</span>
                        <div className={`text-3xl font-bold ${
                          aiAnalysis.score >= 80 ? 'text-green-500' :
                          aiAnalysis.score >= 60 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {aiAnalysis.score}/100
                        </div>
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    {aiAnalysis.breakdown && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {[
                          { label: 'Font Pairing', value: aiAnalysis.breakdown.fontPairing, max: 25 },
                          { label: 'Hierarchy', value: aiAnalysis.breakdown.hierarchy, max: 25 },
                          { label: 'Spacing', value: aiAnalysis.breakdown.spacing, max: 25 },
                          { label: 'Readability', value: aiAnalysis.breakdown.readability, max: 25 },
                        ].map((item) => (
                          <div key={item.label} className="bg-background/50 p-3 rounded-lg text-center">
                            <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                            <div className={`text-lg font-bold ${
                              item.value >= 20 ? 'text-green-500' :
                              item.value >= 15 ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                              {item.value}/{item.max}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 text-primary">Feedback</h4>
                        <ul className="space-y-2">
                          {aiAnalysis.feedback.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-foreground">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3 text-primary">Suggestions</h4>
                        <ul className="space-y-2">
                          {aiAnalysis.suggestions.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">→</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Pairing Tips */}
                    {aiAnalysis.pairingTips && aiAnalysis.pairingTips.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className="font-medium mb-3 text-primary flex items-center gap-2">
                          <Type className="w-4 h-4" />
                          Font Pairing Recommendations
                        </h4>
                        <ul className="space-y-2">
                          {aiAnalysis.pairingTips.map((tip, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2 bg-primary/5 p-3 rounded-lg">
                              <span className="text-primary font-bold">{i + 1}.</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Properties Panel */}
          <div className="space-y-4">
            <Card className="glass-card p-4">
              <h3 className="font-medium mb-4">Text Elements</h3>
              {elements.length === 0 ? (
                <p className="text-sm text-muted-foreground">No elements yet</p>
              ) : (
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {elements.map((el) => (
                    <div
                      key={el.id}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                        selectedElement === el.id ? 'bg-primary/20' : 'hover:bg-white/5'
                      }`}
                      onClick={() => setSelectedElement(el.id)}
                    >
                      <span className="text-sm truncate" style={{ fontFamily: `'${el.font}', sans-serif` }}>
                        {el.text.substring(0, 15)}...
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeElement(el.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {selectedEl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-card p-4 space-y-4">
                  <h3 className="font-medium">Edit Element</h3>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Text</label>
                    <Input
                      value={selectedEl.text}
                      onChange={(e) => updateElement(selectedEl.id, { text: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Font</label>
                    <select
                      value={selectedEl.font}
                      onChange={(e) => updateElement(selectedEl.id, { font: e.target.value })}
                      className="w-full p-2 rounded bg-background/50 border border-white/10 text-sm"
                      style={{ fontFamily: `'${selectedEl.font}', sans-serif` }}
                    >
                      {availableFonts.map(font => (
                        <option key={font} value={font} style={{ fontFamily: `'${font}', sans-serif` }}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">
                      Font Size: {selectedEl.fontSize}px
                    </label>
                    <Slider
                      value={[selectedEl.fontSize]}
                      onValueChange={([value]) => updateElement(selectedEl.id, { fontSize: value })}
                      min={12}
                      max={120}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground flex items-center justify-between">
                      <span>Rotation: {selectedEl.rotation}°</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateElement(selectedEl.id, { rotation: selectedEl.rotation - 15 })}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                          title="Rotate -15°"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => updateElement(selectedEl.id, { rotation: 0 })}
                          className="px-2 py-0.5 text-[10px] hover:bg-white/10 rounded transition-colors"
                          title="Reset rotation"
                        >
                          0°
                        </button>
                        <button
                          onClick={() => updateElement(selectedEl.id, { rotation: selectedEl.rotation + 15 })}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                          title="Rotate +15°"
                        >
                          <RotateCw className="w-3 h-3" />
                        </button>
                      </div>
                    </label>
                    <Slider
                      value={[selectedEl.rotation]}
                      onValueChange={([value]) => updateElement(selectedEl.id, { rotation: value })}
                      min={-180}
                      max={180}
                      step={1}
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground/60">
                      <span>-180°</span>
                      <span>180°</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={selectedEl.color}
                        onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <Input
                        value={selectedEl.color}
                        onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                        className="flex-1 bg-background/50"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <Card className="glass-card p-4">
              <h3 className="font-medium mb-3">Quick Tips</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>• Drag elements to position them</li>
                <li>• Use rotation for dynamic layouts</li>
                <li>• Use 2-3 fonts maximum for harmony</li>
                <li>• Vary sizes to create hierarchy</li>
                <li>• AI analysis works best with 2+ elements</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontPlayground;
