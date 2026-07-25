import { Canvas } from '@react-three/fiber';
import HeroScene from '../3d/HeroScene';

interface HeroCanvasProps {
  mousePosition: { x: number; y: number };
  touchInteracting?: boolean;
}

// Isolated into its own module so `three` + `@react-three/fiber` +
// `@react-three/drei` land in a chunk that's only fetched once this
// component is dynamically imported (see HeroSection.tsx).
export default function HeroCanvas({ mousePosition, touchInteracting = false }: HeroCanvasProps) {
  return (
    <Canvas gl={{ antialias: true, alpha: true }}>
      <HeroScene mousePosition={mousePosition} touchInteracting={touchInteracting} />
    </Canvas>
  );
}
