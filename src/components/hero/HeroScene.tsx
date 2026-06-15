import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// ── Bottle Mesh with float + Y-rotation + mouse tilt ────────────────────────
interface BottleMeshProps {
  imageSrc: string;
  mouseX: number;
  mouseY: number;
}

function BottleMesh({ imageSrc, mouseX, mouseY }: BottleMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const targetTiltX = useRef(0);
  const targetTiltY = useRef(0);
  const currentTiltX = useRef(0);
  const currentTiltY = useRef(0);

  const texture = useLoader(TextureLoader, imageSrc);
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) return;

    // Continuous slow Y-rotation
    meshRef.current.rotation.y += 0.0035;

    // Sine-wave vertical float
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.18;

    // Smooth mouse tilt (spring-like lerp)
    targetTiltX.current = mouseY * 0.3;
    targetTiltY.current = mouseX * 0.25;
    currentTiltX.current += (targetTiltX.current - currentTiltX.current) * 0.06;
    currentTiltY.current += (targetTiltY.current - currentTiltY.current) * 0.06;

    meshRef.current.rotation.x = currentTiltX.current;
    // Y base rotation keeps going, tilt is additive via group
    groupRef.current.rotation.x = currentTiltX.current * 0.5;
  });

  const isPremium = imageSrc.includes('premium');
  const width = isPremium ? 2.8 : 2.4;
  const height = isPremium ? width * 1.6 : width * 1.5; // portrait ratio

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[width, height, 1, 1]} />
        <meshStandardMaterial
          map={texture}
          transparent={!isPremium}
          alphaTest={isPremium ? 0 : 0.01}
          side={THREE.DoubleSide}
          roughness={isPremium ? 0.05 : 0.1}
          metalness={isPremium ? 0.12 : 0.08}
        />
      </mesh>

      {/* Ghost reflection below — only for transparent PNGs */}
      {!isPremium && (
        <mesh position={[0, -height / 2 - 0.12, -0.3]} rotation={[Math.PI, 0, 0]}>
          <planeGeometry args={[width * 0.9, height * 0.3]} />
          <meshStandardMaterial
            map={texture}
            transparent
            opacity={0.07}
            roughness={1}
            side={THREE.FrontSide}
          />
        </mesh>
      )}
    </group>
  );
}

// ── Scene Lighting ───────────────────────────────────────────────────────────
function SceneLights({ isGlycimax }: { isGlycimax: boolean }) {
  const primaryColor = isGlycimax ? '#2C5E3B' : '#C8A261';
  const secondaryColor = isGlycimax ? '#C8A261' : '#2C5E3B';

  return (
    <>
      <ambientLight intensity={0.7} color="#d0e0ff" />
      {/* Key light — front top */}
      <spotLight
        position={[2, 4, 4]}
        intensity={4}
        color="#ffffff"
        angle={0.45}
        penumbra={0.8}
        castShadow={false}
      />
      {/* Primary brand fill */}
      <pointLight position={[-3, 2, 2]} intensity={2} color={primaryColor} />
      {/* Secondary brand accent */}
      <pointLight position={[3, -1, 2]} intensity={1.2} color={secondaryColor} />
      {/* Bottom fill — soft */}
      <pointLight position={[0, -4, 3]} intensity={0.8} color="#ffffff" />
      {/* Rim light from behind */}
      <pointLight position={[0, 1, -4]} intensity={0.6} color={primaryColor} />
    </>
  );
}

// ── Scene Inner ──────────────────────────────────────────────────────────────
function Scene({
  imageSrc,
  mouseX,
  mouseY,
  isGlycimax,
}: {
  imageSrc: string;
  mouseX: number;
  mouseY: number;
  isGlycimax: boolean;
}) {
  return (
    <>
      <SceneLights isGlycimax={isGlycimax} />
      <Suspense fallback={null}>
        <BottleMesh imageSrc={imageSrc} mouseX={mouseX} mouseY={mouseY} />
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.5}
          scale={4.5}
          blur={2.8}
          far={4.5}
          color={isGlycimax ? '#1a3d28' : '#8a6535'}
        />
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

// ── Exported Component ───────────────────────────────────────────────────────
interface HeroSceneProps {
  imageSrc: string;
  mouseX: number;
  mouseY: number;
  isGlycimax: boolean;
}

export default function HeroScene({ imageSrc, mouseX, mouseY, isGlycimax }: HeroSceneProps) {
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene
          imageSrc={imageSrc}
          mouseX={mouseX}
          mouseY={mouseY}
          isGlycimax={isGlycimax}
        />
      </Canvas>
    </div>
  );
}
