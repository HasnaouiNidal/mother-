import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  'rgba(44,94,59,0.7)',
  'rgba(200,162,97,0.6)',
  'rgba(68,128,87,0.5)',
  'rgba(223,190,132,0.5)',
  'rgba(100,180,255,0.35)',
  'rgba(255,255,255,0.3)',
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.6 + 0.15,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * -12,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

const particles = generateParticles(65);

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add mouse-parallax micro-drift to particles via CSS custom property
    const handleMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 20;
      const ny = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.transform = `translate(${nx}px, ${ny}px)`;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ transition: 'transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)', willChange: 'transform' }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `particleFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Large blurred soft orb particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`soft-${i}`}
          style={{
            position: 'absolute',
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            width: `${20 + i * 5}px`,
            height: `${20 + i * 5}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(44,94,59,0.15)' : 'rgba(200,162,97,0.15)',
            filter: 'blur(8px)',
            animation: `particleFloat ${7 + i * 1.5}s ${-i * 2}s ease-in-out infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
