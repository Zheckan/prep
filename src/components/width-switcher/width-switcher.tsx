'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { WidthPreset } from '@/types';

type WidthSwitcherProps = {
  currentWidth: WidthPreset;
  onChangeWidth: (next: WidthPreset) => void;
  headerHeightFallback?: number;
};

const presets: WidthPreset[] = ['narrow', 'comfortable', 'wide', 'full'];

export function WidthSwitcher({
  currentWidth,
  onChangeWidth,
  headerHeightFallback = 120,
}: WidthSwitcherProps) {
  const [headerHeight, setHeaderHeight] =
    useState<number>(headerHeightFallback);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const header = document.getElementById('page-header');
    if (!header) return;
    const update = () => setHeaderHeight(header.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className='sticky z-40 mb-2 hidden w-full justify-center px-6 sm:flex'
      style={{
        top: `var(--page-header-height, ${headerHeight}px)`,
        transition: 'top 0.28s ease-in-out',
        transform: 'translateY(50%)',
      }}
    >
      <div className='glass relative inline-flex items-center gap-0.5 rounded-full p-1 text-xs'>
        {presets.map((preset) => {
          const isActive = currentWidth === preset;
          return (
            <button
              aria-pressed={isActive}
              className={`relative z-10 rounded-full px-3 py-1.5 capitalize transition-colors duration-200 ${
                isActive
                  ? 'text-[#0b0f1a]'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
              key={preset}
              onClick={() => onChangeWidth(preset)}
              type='button'
            >
              {isActive && (
                <motion.div
                  className='absolute inset-0 rounded-full bg-[var(--accent)]'
                  layoutId='width-indicator'
                  style={{ zIndex: -1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              {preset}
            </button>
          );
        })}
      </div>
    </div>
  );
}
