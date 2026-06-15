import { motion } from 'motion/react';

const geometrics = [
  // [size, top%, left%, borderRadius, color, blurPx, durationS, delayS, borderWidth, rotate]
  { size: 180, top: 8, left: 68, radius: '50%', color: 'rgba(44,94,59,0.12)', blur: 0, dur: 9, delay: 0, border: '1px solid rgba(44,94,59,0.25)', rot: 0 },
  { size: 90, top: 72, left: 20, radius: '30% 70% 70% 30% / 30% 30% 70% 70%', color: 'rgba(200,162,97,0.08)', blur: 2, dur: 11, delay: 2, border: '1px solid rgba(200,162,97,0.2)', rot: 45 },
  { size: 50, top: 15, left: 15, radius: '50%', color: 'transparent', blur: 0, dur: 7, delay: 1, border: '1px solid rgba(255,255,255,0.08)', rot: 0 },
  { size: 120, top: 55, left: 78, radius: '20%', color: 'rgba(100,180,255,0.05)', blur: 4, dur: 13, delay: 3, border: '1px solid rgba(100,180,255,0.12)', rot: 30 },
  { size: 30, top: 85, left: 55, radius: '50%', color: 'rgba(223,190,132,0.2)', blur: 0, dur: 5, delay: 0.5, border: 'none', rot: 0 },
  { size: 200, top: 30, left: -5, radius: '50%', color: 'transparent', blur: 0, dur: 15, delay: 5, border: '1px solid rgba(44,94,59,0.06)', rot: 0 },
  { size: 16, top: 45, left: 88, radius: '4px', color: 'rgba(200,162,97,0.35)', blur: 0, dur: 6, delay: 2.5, border: 'none', rot: 45 },
  { size: 24, top: 20, left: 48, radius: '50%', color: 'transparent', blur: 0, dur: 8, delay: 1.5, border: '1px solid rgba(255,255,255,0.12)', rot: 0 },
];

export default function FloatingGeometrics() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {geometrics.map((g, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -18, 0],
            rotate: [g.rot, g.rot + 8, g.rot],
          }}
          transition={{
            opacity: { duration: 1.5, delay: g.delay + 0.5 },
            scale: { duration: 1.5, delay: g.delay + 0.5 },
            y: { duration: g.dur, repeat: Infinity, ease: 'easeInOut', delay: g.delay },
            rotate: { duration: g.dur * 1.5, repeat: Infinity, ease: 'easeInOut', delay: g.delay },
          }}
          style={{
            position: 'absolute',
            top: `${g.top}%`,
            left: `${g.left}%`,
            width: `${g.size}px`,
            height: `${g.size}px`,
            borderRadius: g.radius,
            background: g.color,
            border: g.border,
            filter: g.blur > 0 ? `blur(${g.blur}px)` : undefined,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Orbiting ring around the product zone */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          right: '8%',
          width: '420px',
          height: '420px',
          transform: 'translate(0, -50%)',
          border: '1px solid rgba(44,94,59,0.08)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      >
        {/* Dot on the ring */}
        <div style={{
          position: 'absolute',
          top: '-4px',
          left: '50%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'rgba(44,94,59,0.5)',
          boxShadow: '0 0 10px rgba(44,94,59,0.8)',
          transform: 'translateX(-50%)',
        }} />
      </motion.div>

      {/* Second orbiting ring — counter-clockwise */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          right: '8%',
          width: '340px',
          height: '340px',
          transform: 'translate(0, -50%)',
          border: '1px solid rgba(200,162,97,0.06)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      >
        <div style={{
          position: 'absolute',
          bottom: '-4px',
          left: '50%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'rgba(200,162,97,0.6)',
          boxShadow: '0 0 8px rgba(200,162,97,0.8)',
          transform: 'translateX(-50%)',
        }} />
      </motion.div>
    </div>
  );
}
