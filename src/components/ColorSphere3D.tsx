import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Slider } from '@/components/ui/slider';

function ColorSphere({ hue, saturation, lightness }: { hue: number; saturation: number; lightness: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
    </mesh>
  );
}

function ColorPoints({ hue, saturation }: { hue: number; saturation: number }) {
  const points = [];
  
  // Create color points around the sphere
  for (let l = 0; l <= 100; l += 20) {
    for (let h = 0; h < 360; h += 30) {
      const phi = (h / 360) * Math.PI * 2;
      const theta = ((l / 100) * Math.PI);
      const radius = 2.2;
      
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.sin(phi);
      
      points.push({
        position: [x, y, z] as [number, number, number],
        color: `hsl(${h}, ${saturation}%, ${l}%)`
      });
    }
  }

  return (
    <>
      {points.map((point, i) => (
        <mesh key={i} position={point.position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={point.color} />
        </mesh>
      ))}
    </>
  );
}

export default function ColorSphere3D() {
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(70);
  const [lightness, setLightness] = useState(50);

  return (
    <div className="w-full h-[600px] glass-card">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">3D Color Sphere</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Visualize HSL colors in 3D space. Adjust the sliders to explore different color combinations.
        </p>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium flex items-center justify-between mb-2">
              <span>Hue: {hue}°</span>
              <span className="w-8 h-8 rounded border" style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}></span>
            </label>
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
            <label className="text-sm font-medium mb-2 block">
              Saturation: {saturation}%
            </label>
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
            <label className="text-sm font-medium mb-2 block">
              Lightness: {lightness}%
            </label>
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
      </div>

      <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-background/50 to-background/20 border border-white/10">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <ColorSphere hue={hue} saturation={saturation} lightness={lightness} />
          <ColorPoints hue={hue} saturation={saturation} />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={4}
            maxDistance={10}
          />
        </Canvas>
      </div>
    </div>
  );
}
