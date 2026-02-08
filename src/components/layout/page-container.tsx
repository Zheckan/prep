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

const validPresets = new Set<string>(Object.keys(presetToMaxWidth));

export function PageContainer({
  children,
  className = '',
  initialWidth = 'comfortable',
  allowWidthToggle = true,
}: PageContainerProps) {
  const storageKey = 'prep:content-width';
  const [width, setWidth] = useState<WidthPreset>(initialWidth);

  const [headerHeight, setHeaderHeight] = useState<number>(120);

  // Sync width state from localStorage/data-attribute after hydration
  useEffect(() => {
    // First check localStorage (most reliable client-side)
    const stored = localStorage.getItem(storageKey);
    if (stored && validPresets.has(stored)) {
      setWidth(stored as WidthPreset);
      document.documentElement.dataset.contentWidth = stored;
      return;
    }
    // Fallback to data attribute set by boot script or SSR cookie
    const attr = document.documentElement.dataset.contentWidth;
    if (attr && validPresets.has(attr)) {
      setWidth(attr as WidthPreset);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const header = document.getElementById('page-header');
    if (!header) {
      return;
    }

    const update = () => setHeaderHeight(header.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => {
      observer.disconnect();
    };
  }, []);

  const applyWidthPreference = (next: WidthPreset) => {
    setWidth(next);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey, next);
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
              name: 'prep-content-width',
              value: next,
              path: '/',
              expires,
            })
            .catch(() => {
              /* ignore Cookie Store failures */
            });
        }
      }
    } catch {
      /* ignore SSR/storage write errors */
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
      {allowWidthToggle && (
        <WidthSwitcher
          currentWidth={width}
          headerHeightFallback={headerHeight}
          onChangeWidth={applyWidthPreference}
        />
      )}

      <div className={containerClasses}>{children}</div>
    </div>
  );
}
