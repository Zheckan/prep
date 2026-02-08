'use client';

import type { WidthPreset } from '@/types';

type WidthSwitcherProps = {
  currentWidth: WidthPreset;
  onChangeWidth: (next: WidthPreset) => void;
};

const presets: { key: WidthPreset; icon: string }[] = [
  { key: 'narrow', icon: '┃' },
  { key: 'comfortable', icon: '┃┃' },
  { key: 'wide', icon: '┃┃┃' },
  { key: 'full', icon: '┃┃┃┃' },
];

export function WidthSwitcher({
  currentWidth,
  onChangeWidth,
}: WidthSwitcherProps) {
  return (
    <div
      className='sticky z-40 mb-2 hidden w-full justify-center px-6 sm:flex'
      style={{
        top: 'var(--page-header-height, 128px)',
        transition: 'top 0.28s ease-in-out',
        transform: 'translateY(50%)',
      }}
    >
      <div className='glass inline-flex items-center gap-0.5 rounded-full p-1 text-sm'>
        {presets.map((preset) => (
          <button
            aria-label={`Set width to ${preset.key}`}
            aria-pressed={currentWidth === preset.key}
            className={`rounded-full px-3 py-1 font-mono text-xs capitalize transition-all duration-200 ${
              currentWidth === preset.key
                ? 'bg-[var(--accent-strong)] text-white shadow-sm'
                : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)]'
            }`}
            key={preset.key}
            onClick={() => onChangeWidth(preset.key)}
            type='button'
          >
            {preset.key}
          </button>
        ))}
      </div>
    </div>
  );
}
