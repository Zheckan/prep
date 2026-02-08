'use client';

import { useEffect, useMemo, useState } from 'react';
import { WidthSwitcher } from '@/components/width-switcher';
import type { PageContainerProps, WidthPreset } from '@/types';

const presetToMaxWidth: Record<WidthPreset, string> = {
  narrow: '50vw',
  comfortable: '65vw',
  wide: '80vw',
  full: '100vw',
};

const VALID_PRESETS = new Set<string>(Object.keys(presetToMaxWidth));
const STORAGE_KEY = 'prep:content-width';
const COOKIE_KEY = 'prep-content-width';

function readPersistedWidth(): WidthPreset | null {
  if (typeof window === 'undefined') return null;
  try {
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    if (fromStorage && VALID_PRESETS.has(fromStorage)) {
      return fromStorage as WidthPreset;
    }
  } catch {
    /* ignore */
  }
  const attr = document.documentElement.dataset.contentWidth;
  if (attr && VALID_PRESETS.has(attr)) {
    return attr as WidthPreset;
  }
  return null;
}

export function PageContainer({
  children,
  className = '',
  initialWidth = 'comfortable',
  allowWidthToggle = true,
}: PageContainerProps) {
  const [width, setWidth] = useState<WidthPreset>(initialWidth);
  const [hydrated, setHydrated] = useState(false);

  // Sync with persisted value once on mount (intentionally ignoring width to avoid re-running)
  useEffect(() => {
    const persisted = readPersistedWidth();
    if (persisted) {
      setWidth(persisted);
      document.documentElement.dataset.contentWidth = persisted;
    }
    setHydrated(true);
    // biome-ignore lint/correctness/useExhaustiveDependencies: mount-only effect
  }, []);

  const applyWidthPreference = (next: WidthPreset) => {
    setWidth(next);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      document.documentElement.dataset.contentWidth = next;
      if ('cookieStore' in globalThis) {
        type CookieStore = {
          set: (cookie: {
            name: string;
            value: string;
            path?: string;
            expires?: Date;
          }) => Promise<void>;
        };
        const cookieStore = (globalThis as { cookieStore?: CookieStore })
          .cookieStore;
        const expires = new Date(Date.now() + 31_536_000 * 1000);
        if (cookieStore) {
          cookieStore
            .set({
              name: COOKIE_KEY,
              value: next,
              path: '/',
              expires,
            })
            .catch(() => {
              /* Cookie Store write failure is non-critical */
            });
        }
      }
    } catch {
      /* ignore */
    }
  };

  const containerClasses = useMemo(() => {
    return [
      'content-container mx-0 sm:mx-auto px-4 py-8',
      'transition-[max-width] duration-200 ease-in-out',
      className,
    ].join(' ');
  }, [className]);

  return (
    <div className='w-full'>
      {allowWidthToggle && hydrated && (
        <WidthSwitcher
          currentWidth={width}
          onChangeWidth={applyWidthPreference}
        />
      )}
      <div className={containerClasses}>{children}</div>
    </div>
  );
}
