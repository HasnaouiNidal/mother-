import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number; // percentage left
  delay: number; // seconds
  duration: number; // seconds
  size: number; // size in pixels
  type: 'leaf' | 'sparkle';
  rotateStart: number;
  rotateEnd: number;
}

export default function LeafParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    
    // Generate a set of random organic drifting particles
    const generated: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95, // left percentage
      delay: Math.random() * 5, // stagger start
      duration: 15 + Math.random() * 20, // drift duration
      size: 10 + Math.random() * 16, // size
      type: Math.random() > 0.4 ? 'leaf' : 'sparkle',
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 180
    }));
    setParticles(generated);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        if (p.type === 'leaf') {
          return (
            <motion.div
              key={p.id}
              initial={{ y: -100, x: `${p.x}%`, opacity: 0, rotate: p.rotateStart }}
              animate={{ 
                y: '110vh', 
                opacity: [0, 0.4, 0.4, 0],
                rotate: p.rotateEnd,
                x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`] 
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ width: p.size, height: p.size }}
              className="absolute text-brand-green/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.36,9.32 15.37,7.32C17,7 18,6 18,6C18,6 19,7 17.5,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.07 19.22,15.96 17.95,17.4C16,13.68 12.87,11.23 9.07,10.07C10.74,7.44 13.56,5.43 17,4.42C15.54,4.15 14,4 12,4M5.6,8.2C7,9 8.24,10 9.24,11.2C6.93,12.79 5.23,15.06 4.35,17.75C4.12,16 4,14.07 4.23,12.03C4.46,10.05 4.96,9.08 5.6,8.2Z" />
              </svg>
            </motion.div>
          );
        } else {
          return (
            <motion.div
              key={p.id}
              initial={{ y: -100, x: `${p.x}%`, opacity: 0, scale: 0.5 }}
              animate={{ 
                y: '110vh', 
                opacity: [0, 0.6, 0.6, 0],
                scale: [0.5, 1.2, 0.5],
                x: [`${p.x}%`, `${p.x + (Math.random() * 8 - 4)}%`]
              }}
              transition={{
                duration: p.duration - 5,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ width: p.size / 2, height: p.size / 2 }}
              className="absolute bg-brand-gold/25 rounded-full blur-[1px]"
            />
          );
        }
      })}
    </div>
  );
}
