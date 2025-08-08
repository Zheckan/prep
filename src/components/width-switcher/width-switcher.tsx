'use client';

import { useEffect, useState } from 'react';
import type { WidthPreset } from '@/types';

type WidthSwitcherProps = {
  currentWidth: WidthPreset;
  onChangeWidth: (next: WidthPreset) => void;
  headerHeightFallback?: number;
};

export function WidthSwitcher({
  currentWidth,
  onChangeWidth,
  headerHeightFallback = 120,
}: WidthSwitcherProps) {
  // Track live header height via ResizeObserver as a fallback when the CSS var is not yet set
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
      <div className='glass inline-flex items-center gap-1 rounded-full p-1 text-sm text-white'>
        {(['narrow', 'comfortable', 'wide', 'full'] as WidthPreset[]).map(
          (preset) => (
            <button
              aria-pressed={currentWidth === preset}
              className={`rounded-full px-3 py-1 capitalize transition-colors ${
                currentWidth === preset
                  ? 'bg-yellow-500 text-black'
                  : 'text-zinc-200 hover:text-yellow-500'
              }`}
              key={preset}
              onClick={() => onChangeWidth(preset)}
              type='button'
            >
              {preset}
            </button>
          )
        )}
      </div>
    </div>
  );
}
