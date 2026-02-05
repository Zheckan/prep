'use client';

import { motion } from 'framer-motion';

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className='fixed inset-0 overflow-hidden'
      style={{ zIndex: -10, pointerEvents: 'none' }}
    >
      {/* Base gradient */}
      <div
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent 70%)',
        }}
      />

      {/* Aurora orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        className='motion-safe-only absolute top-[-10%] left-[15%] h-[500px] w-[500px] rounded-full'
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%)',
          filter: 'blur(60px)',
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        className='motion-safe-only absolute top-[20%] right-[10%] h-[600px] w-[600px] rounded-full'
        style={{
          background:
            'radial-gradient(circle, rgba(236, 72, 153, 0.12), transparent 70%)',
          filter: 'blur(80px)',
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -20, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        className='motion-safe-only absolute bottom-[-5%] left-[30%] h-[500px] w-[500px] rounded-full'
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)',
          filter: 'blur(70px)',
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -20, 0],
        }}
        className='motion-safe-only absolute top-[50%] left-[60%] h-[400px] w-[400px] rounded-full'
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%)',
          filter: 'blur(60px)',
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className='absolute inset-0 opacity-[0.015]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Top edge glow */}
      <div
        className='absolute inset-x-0 top-0 h-px'
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.2), transparent)',
        }}
      />
    </div>
  );
}

export default AmbientBackground;
