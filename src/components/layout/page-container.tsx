'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const [toggleHeight, setToggleHeight] = useState<number>(0);

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
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, []);

  // Measure the toggle element height so we can position it precisely
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const element = toggleRef.current;
    if (!element) {
      return;
    }

    const update = () => {
      const { height } = element.getBoundingClientRect();
      setToggleHeight(height);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener('resize', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Track small-screen state so we can force full width on mobile
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const mql = window.matchMedia('(max-width: 640px)');
    const update = () => setIsSmall(mql.matches);
    update();
    // Support older Safari
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update);
      return () => mql.removeEventListener('change', update);
    }
    mql.addListener(update);
    return () => mql.removeListener(update);
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
          className='sticky z-40 mx-auto mb-2 hidden w-full justify-center px-6 sm:flex'
          ref={toggleRef}
          style={{
            // Position relative to the header bottom so it moves 1:1 with header collapse
            top: headerHeight + toggleHeight / 2,
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

      <div
        className={containerClasses}
        style={{
          maxWidth: isSmall ? '100%' : `min(100%, ${presetToMaxWidth[width]})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
