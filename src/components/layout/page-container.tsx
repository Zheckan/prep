'use client';

import { useEffect, useMemo, useState } from 'react';

type WidthPreset = 'narrow' | 'comfortable' | 'wide' | 'full';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  initialWidth?: WidthPreset;
  allowWidthToggle?: boolean;
}

const presetToMaxWidth: Record<WidthPreset, string> = {
  narrow: '50vw',
  comfortable: '65vw',
  wide: '80vw',
  full: '100vw',
};

export function PageContainer({
  children,
  className = '',
  initialWidth = 'comfortable',
  allowWidthToggle = true,
}: PageContainerProps) {
  const storageKey = 'prep:content-width';
  const [width, setWidth] = useState<WidthPreset>(() => initialWidth);

  const [headerHeight, setHeaderHeight] = useState<number>(140);

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

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(
        storageKey
      ) as WidthPreset | null;
      const attr = document.documentElement.dataset.contentWidth as
        | WidthPreset
        | undefined;
      const initial = saved || attr;
      if (initial && initial in presetToMaxWidth) {
        setWidth(initial);
      }
    } catch {
      /* ignore SSR/storage read errors */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, width);
      document.documentElement.dataset.contentWidth = width;
      // Write cookie for SSR to match on next request using Cookie Store API when available
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
              value: width,
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
  }, [width]);

  const containerClasses = useMemo(() => {
    return [
      'content-container mx-auto px-6 py-8',
      'transition-[max-width] duration-200 ease-in-out',
      className,
    ].join(' ');
  }, [className]);

  return (
    <div className='w-full'>
      {allowWidthToggle && (
        <div
          className='sticky z-40 mx-auto mb-2 hidden w-full translate-y-1/2 justify-center px-6 sm:flex'
          style={{
            // Position relative to the header bottom so it moves 1:1 with header collapse
            top: headerHeight,
          }}
        >
          <div className='glass inline-flex items-center gap-1 rounded-full p-1 text-sm text-white'>
            {(['narrow', 'comfortable', 'wide', 'full'] as WidthPreset[]).map(
              (preset) => (
                <button
                  aria-pressed={width === preset}
                  className={`rounded-full px-3 py-1 capitalize transition-colors ${
                    width === preset
                      ? 'bg-yellow-500 text-black'
                      : 'text-zinc-200 hover:text-yellow-500'
                  }`}
                  key={preset}
                  onClick={() => setWidth(preset)}
                  type='button'
                >
                  {preset}
                </button>
              )
            )}
          </div>
        </div>
      )}

      <div className={containerClasses}>{children}</div>
    </div>
  );
}
