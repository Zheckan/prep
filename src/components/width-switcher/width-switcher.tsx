'use client';

import type { WidthPreset } from '@/types';

type WidthSwitcherProps = {
  currentWidth: WidthPreset;
  onChangeWidth: (next: WidthPreset) => void;
};

const presets: { value: WidthPreset; label: string }[] = [
  { value: 'narrow', label: 'S' },
  { value: 'comfortable', label: 'M' },
  { value: 'wide', label: 'L' },
  { value: 'full', label: 'XL' },
];

export function WidthSwitcher({
  currentWidth,
  onChangeWidth,
}: WidthSwitcherProps) {
  return (
    <div className='mb-6 hidden items-center gap-2 sm:flex'>
      <span className='text-[11px] text-zinc-500 uppercase tracking-wide'>
        Width
      </span>
      <div className='flex items-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-0.5'>
        {presets.map((preset) => (
          <button
            aria-pressed={currentWidth === preset.value}
            className={`rounded-md px-2.5 py-1 font-medium font-mono text-[11px] transition-all ${
              currentWidth === preset.value
                ? 'bg-yellow-500 text-black shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            key={preset.value}
            onClick={() => onChangeWidth(preset.value)}
            type='button'
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
