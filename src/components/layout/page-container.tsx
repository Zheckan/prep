'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { PageContainerProps, WidthPreset } from '@/types';

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
  const [width, setWidth] = useState<WidthPreset>(() => {
    if (typeof document !== 'undefined') {
      const attr = document.documentElement.dataset.contentWidth as
        | WidthPreset
        | undefined;
      if (attr && attr in presetToMaxWidth) {
        return attr;
      }
    }
    return initialWidth;
  });

  const [headerHeight, setHeaderHeight] = useState<number>(120);
  const [selectorHeight, setSelectorHeight] = useState<number>(0);
  const selectorRef = useRef<HTMLDivElement | null>(null);

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

  // Measure selector pill height
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = selectorRef.current;
    if (!el) return;
    const update = () => setSelectorHeight(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Drive a global content top offset that includes selector space on desktop
  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }
    const mq = window.matchMedia('(min-width: 640px)');
    const computeAndSet = () => {
      const isDesktop = mq.matches;
      let offset = headerHeight;
      if (isDesktop && allowWidthToggle) {
        // Keep a stable, non-jumpy offset on desktop; ensure at least 180px
        const extra = Math.max(16, Math.round(selectorHeight * 0.5));
        offset = Math.max(180, headerHeight + extra);
      }
      document.documentElement.style.setProperty(
        '--content-top-offset',
        `${offset}px`
      );
    };
    computeAndSet();
    const handler = () => computeAndSet();
    mq.addEventListener?.('change', handler);
    window.addEventListener('resize', handler);
    return () => {
      mq.removeEventListener?.('change', handler);
      window.removeEventListener('resize', handler);
    };
  }, [headerHeight, selectorHeight, allowWidthToggle]);

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
        <div
          className='fixed right-0 left-0 z-40 mb-2 hidden justify-center px-6 sm:flex'
          style={{
            // Track the header with a CSS var, and animate the change
            top: `var(--page-header-height, ${headerHeight}px)`,
            transition: 'top 0.28s ease-in-out',
            transform: 'translateY(50%)',
          }}
        >
          <div
            className='glass inline-flex items-center gap-1 rounded-full p-1 text-sm text-white'
            ref={selectorRef}
          >
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
                  onClick={() => applyWidthPreference(preset)}
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
