import { motion } from 'motion/react';

interface GlowOrbsProps {
  activeProduct: 'glycimax' | 'appeto';
}

export default function GlowOrbs({ activeProduct }: GlowOrbsProps) {
  const isGlycimax = activeProduct === 'glycimax';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary large green/blue glow — center-right */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: isGlycimax ? [0.55, 0.75, 0.55] : [0.3, 0.45, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          right: '10%',
          top: '15%',
          width: '620px',
          height: '620px',
          background: isGlycimax
            ? 'radial-gradient(circle, rgba(44,94,59,0.55) 0%, rgba(44,94,59,0.18) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(200,162,97,0.45) 0%, rgba(200,162,97,0.12) 45%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          transition: 'background 1.2s ease',
        }}
      />

      {/* Secondary mid-left warm glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: isGlycimax ? [0.35, 0.55, 0.35] : [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          left: '5%',
          bottom: '10%',
          width: '480px',
          height: '480px',
          background: isGlycimax
            ? 'radial-gradient(circle, rgba(200,162,97,0.3) 0%, rgba(200,162,97,0.08) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(44,94,59,0.35) 0%, rgba(44,94,59,0.1) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          transition: 'background 1.2s ease',
        }}
      />

      {/* Tertiary top-center electric blue accent */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{
          position: 'absolute',
          left: '35%',
          top: '-5%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(100,180,255,0.25) 0%, rgba(60,120,220,0.08) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      {/* Small crisp bottom-right accent dot */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          right: '15%',
          bottom: '20%',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(223,190,132,0.6) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
      />

      {/* Subtle vignette overlay at very top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to bottom, rgba(5,14,26,0.6) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
