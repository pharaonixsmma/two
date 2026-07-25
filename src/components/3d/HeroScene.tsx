import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Torus, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import ParticleField from './ParticleField';

interface HeroSceneProps {
  mousePosition: { x: number; y: number };
  touchInteracting?: boolean;
}

export default function HeroScene({ mousePosition, touchInteracting = false }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cameraTarget = new THREE.Vector3();

  useFrame((state) => {
    // Gentle camera parallax based on mouse
    cameraTarget.set(mousePosition.x * 0.5, mousePosition.y * 0.5, state.camera.position.z);
    state.camera.position.lerp(cameraTarget, 0.05);
    state.camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#000000', 8, 25]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[2, 3, 4]} color="#D4AF37" intensity={2} />
      <pointLight position={[-3, -2, -3]} color="#ffffff" intensity={1} />
      <spotLight position={[0, 0, 5]} color="#D4AF37" intensity={1.5} angle={0.6} penumbra={1} />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          {/* Main central form */}
          <mesh scale={1.2}>
            <icosahedronGeometry args={[1, 0]} />
            <MeshDistortMaterial
              color="#D4AF37"
              metalness={1}
              roughness={0.1}
              distort={0.4}
              speed={2}
            />
          </mesh>
          
          {/* Orbiting ring */}
          <Torus args={[2.5, 0.01, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
            <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} wireframe />
          </Torus>
          <Torus args={[2.5, 0.01, 16, 100]} rotation={[0, Math.PI / 3, 0]}>
            <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} wireframe />
          </Torus>
        </Float>
      </group>

      <ParticleField mousePosition={mousePosition} touchInteracting={touchInteracting} />
      
      {/* Additional ambient sparkles */}
      <Sparkles count={100} scale={10} size={2} color="#D4AF37" opacity={0.2} speed={0.4} />
    </>
  );
}
