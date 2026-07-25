import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  mousePosition?: { x: number; y: number };
  touchInteracting?: boolean;
}

export default function ParticleField({ mousePosition = { x: 0, y: 0 }, touchInteracting = false }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;

  // Smoothed, inertial copy of the incoming mouse position -- avoids
  // snapping the field around on every mousemove sample.
  const smoothedMouse = useRef({ x: 0, y: 0 });
  const entrance = useRef(0); // 0 -> 1 gather-in progress

  // Touch-only finger proximity reaction. Eases in while a finger is
  // actively moving and eases back out the moment it stops or lifts, so the
  // field never snaps -- desktop stays untouched since this stays at 0
  // whenever `touchInteracting` is false (i.e. always, for mouse input).
  const touchIntensity = useRef(0);

  const [homePositions, scatterOffsets, sizes] = useMemo(() => {
    const homePositions = new Float32Array(count * 3);
    const scatterOffsets = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spherical distribution for the resting/interactive state
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2 + Math.random() * 6;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      homePositions[i * 3] = x;
      homePositions[i * 3 + 1] = y;
      homePositions[i * 3 + 2] = z;

      // Each particle starts scattered further out along its own radial
      // direction, so the entrance reads as a gentle inward gather rather
      // than a random explosion in reverse.
      const scatterScale = 2.5 + Math.random() * 3;
      scatterOffsets[i * 3] = x * scatterScale;
      scatterOffsets[i * 3 + 1] = y * scatterScale;
      scatterOffsets[i * 3 + 2] = z * scatterScale;

      sizes[i] = Math.random() * 0.05;
    }

    return [homePositions, scatterOffsets, sizes];
  }, [count]);

  const positions = useMemo(() => new Float32Array(homePositions), [homePositions]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const t = state.clock.elapsedTime;

    // Ease mouse input with inertia so the field drifts rather than jumps.
    smoothedMouse.current.x += (mousePosition.x - smoothedMouse.current.x) * Math.min(delta * 2.2, 1);
    smoothedMouse.current.y += (mousePosition.y - smoothedMouse.current.y) * Math.min(delta * 2.2, 1);

    // Entrance: particles gather from a wide scatter into their resting
    // sphere over the first ~2.2s, then hand off to the ambient motion.
    entrance.current = Math.min(entrance.current + delta / 2.2, 1);
    const gather = 1 - Math.pow(1 - entrance.current, 3); // ease-out cubic

    // Ease the touch-interaction intensity toward its target (1 while a
    // finger is moving, 0 once it stops/lifts) so the effect fades smoothly
    // rather than toggling abruptly.
    const targetIntensity = touchInteracting ? 1 : 0;
    // Fast time constant (~70ms) so a lifted/paused finger reads as "at
    // rest" again within roughly a quarter second, including the idle
    // detection delay upstream.
    touchIntensity.current += (targetIntensity - touchIntensity.current) * Math.min(delta * 14, 1);
    const activeIntensity = touchIntensity.current;

    // Pointer position projected into coordinate space for cursor interaction
    const pointerX = smoothedMouse.current.x * 5.2;
    const pointerY = smoothedMouse.current.y * 5.2;
    const interactionRadius = 3.0;
    const interactionStrength = 0.85;

    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      let px = THREE.MathUtils.lerp(scatterOffsets[ix], homePositions[ix], gather);
      let py = THREE.MathUtils.lerp(scatterOffsets[ix + 1], homePositions[ix + 1], gather);
      const pz = THREE.MathUtils.lerp(scatterOffsets[ix + 2], homePositions[ix + 2], gather);

      // Cursor proximity interaction (mouse & touch)
      const dx = px - pointerX;
      const dy = py - pointerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < interactionRadius && dist > 0.0001) {
        const falloff = 1 - dist / interactionRadius;
        const push = falloff * falloff * interactionStrength * gather;
        px += (dx / dist) * push;
        py += (dy / dist) * push;
      }

      posAttr.array[ix] = px;
      posAttr.array[ix + 1] = py;
      posAttr.array[ix + 2] = pz;
    }
    posAttr.needsUpdate = true;

    // Slow ambient rotation, with a subtle cursor-driven parallax tilt
    // layered on top once the entrance has mostly settled.
    pointsRef.current.rotation.y = t * 0.05 + smoothedMouse.current.x * 0.15 * gather;
    pointsRef.current.rotation.x = smoothedMouse.current.y * 0.1 * gather;
    pointsRef.current.rotation.z = t * 0.02;

    // Breathing effect, damped during the entrance so the gather reads clean
    const breathe = 1 + Math.sin(t * 0.5) * 0.1 * gather;
    pointsRef.current.scale.setScalar(breathe);

    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.6 * gather;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#D4AF37"
        transparent
        opacity={0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
