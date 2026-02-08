'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AmbientBackground() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      aria-hidden
      className='fixed inset-0'
      style={{ zIndex: -10, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Base gradient */}
      <div
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(99, 102, 241, 0.15), transparent 60%), radial-gradient(ellipse 80% 60% at 80% 50%, rgba(6, 182, 212, 0.1), transparent 50%), radial-gradient(ellipse 80% 60% at 20% 80%, rgba(139, 92, 246, 0.08), transparent 50%)',
        }}
      />

      {/* Animated orbs */}
      <motion.div
        animate={
          prefersReduced
            ? {}
            : {
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        className='absolute top-[-10%] right-[10%] h-[500px] w-[500px] rounded-full opacity-20'
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent 70%)',
          filter: 'blur(80px)',
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        animate={
          prefersReduced
            ? {}
            : {
                x: [0, -25, 35, 0],
                y: [0, 30, -25, 0],
                scale: [1, 0.9, 1.05, 1],
              }
        }
        className='absolute bottom-[10%] left-[5%] h-[400px] w-[400px] rounded-full opacity-15'
        style={{
          background:
            'radial-gradient(circle, rgba(52, 211, 153, 0.4), transparent 70%)',
          filter: 'blur(80px)',
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        animate={
          prefersReduced
            ? {}
            : {
                x: [0, 40, -15, 0],
                y: [0, -20, 35, 0],
              }
        }
        className='absolute top-[40%] left-[50%] h-[350px] w-[350px] rounded-full opacity-10'
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent 70%)',
          filter: 'blur(80px)',
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      {/* Fade to background at bottom */}
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(to bottom, transparent 40%, var(--background) 100%)',
        }}
      />

      {/* Grid overlay for subtle texture */}
      <div
        className='absolute inset-0 opacity-[0.015]'
        style={{
          backgroundImage:
            'linear-gradient(rgba(148, 163, 184, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}

export default AmbientBackground;
