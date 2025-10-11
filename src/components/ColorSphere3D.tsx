import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

function ColorWheel({ selectedHue, selectedSaturation, selectedLightness }: { selectedHue: number; selectedSaturation: number; selectedLightness: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a color wheel texture similar to Adobe Color
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    
    // Draw color wheel
    for (let angle = 0; angle < 360; angle += 0.5) {
      const startAngle = (angle - 0.5) * Math.PI / 180;
      const endAngle = (angle + 0.5) * Math.PI / 180;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `hsl(${angle}, 0%, 100%)`);
      gradient.addColorStop(0.15, `hsl(${angle}, 20%, 95%)`);
      gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <circleGeometry args={[2.5, 128]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ColorPickerPoints({ hue, saturation, lightness, onColorSelect }: { 
  hue: number; 
  saturation: number; 
  lightness: number;
  onColorSelect: (h: number, s: number, l: number) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Create 5 color picker points in an analogous harmony
  const colors = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const angleOffset = (i - 2) * 25; // Spread points around selected hue
      const h = (hue + angleOffset + 360) % 360;
      return {
        h,
        s: saturation,
        l: lightness,
        position: calculatePosition(h, saturation)
      };
    });
  }, [hue, saturation, lightness]);

  function calculatePosition(h: number, s: number) {
    const angle = (h * Math.PI) / 180;
    const radius = (s / 100) * 2.3;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.1
    ] as [number, number, number];
  }

  return (
    <>
      {colors.map((color, i) => (
        <group key={i} position={color.position}>
          <mesh
            onPointerEnter={() => setHoveredIndex(i)}
            onPointerLeave={() => setHoveredIndex(null)}
            onClick={() => onColorSelect(color.h, color.s, color.l)}
          >
            <sphereGeometry args={[hoveredIndex === i ? 0.15 : 0.12, 32, 32]} />
            <meshBasicMaterial color={`hsl(${color.h}, ${color.s}%, ${color.l}%)`} />
          </mesh>
          {/* White outline */}
          <mesh>
            <sphereGeometry args={[hoveredIndex === i ? 0.17 : 0.14, 32, 32]} />
            <meshBasicMaterial color="white" transparent opacity={0.8} side={THREE.BackSide} />
          </mesh>
        </group>
      ))}
    </>
  );
}

export default function ColorSphere3D() {
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(85);
  const [lightness, setLightness] = useState(50);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleColorSelect = (h: number, s: number, l: number) => {
    setHue(h);
    setSaturation(s);
    setLightness(l);
  };

  const currentColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const hexColor = hslToHex(hue, saturation, lightness);

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

  function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  // Generate analogous color palette
  const palette = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const angleOffset = (i - 2) * 25;
      const h = (hue + angleOffset + 360) % 360;
      return hslToHex(h, saturation, lightness);
    });
  }, [hue, saturation, lightness]);

  return (
    <div className="w-full glass-card flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Color Wheel</h3>
        <p className="text-sm text-muted-foreground">
          Interactive color wheel inspired by Adobe Color. Click on points to select colors.
        </p>
      </div>

      {/* Canvas Container - Matches ImagePaletteExtractor height */}
      <div className="w-full bg-white rounded-lg overflow-hidden mb-4 flex items-center justify-center" style={{ height: '320px' }}>
        <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
          <ambientLight intensity={1} />
          
          <ColorWheel 
            selectedHue={hue} 
            selectedSaturation={saturation} 
            selectedLightness={lightness} 
          />
          <ColorPickerPoints 
            hue={hue} 
            saturation={saturation} 
            lightness={lightness}
            onColorSelect={handleColorSelect}
          />
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      {/* Color Sliders */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Hue</label>
            <span className="text-xs text-muted-foreground">{hue}°</span>
          </div>
          <Slider
            value={[hue]}
            onValueChange={(v) => setHue(v[0])}
            min={0}
            max={360}
            step={1}
            className="w-full"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Saturation</label>
            <span className="text-xs text-muted-foreground">{saturation}%</span>
          </div>
          <Slider
            value={[saturation]}
            onValueChange={(v) => setSaturation(v[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Lightness</label>
            <span className="text-xs text-muted-foreground">{lightness}%</span>
          </div>
          <Slider
            value={[lightness]}
            onValueChange={(v) => setLightness(v[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Color Palette Display */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Analogous Palette</h4>
        <div className="grid grid-cols-5 gap-2">
          {palette.map((color, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() => copyColor(color)}
            >
              <div
                className="h-12 rounded border border-white/10 transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
              />
              <div className="mt-1 text-center">
                <span className="text-xs font-mono">{color}</span>
                {copiedColor === color && (
                  <Check className="w-3 h-3 mx-auto text-green-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
