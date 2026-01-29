'use client';

import { useMemo, useState } from 'react';
import { WidthSwitcher } from '@/components/width-switcher';
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
      'content-container w-full px-4 sm:px-6 py-8',
      'transition-[max-width] duration-200 ease-in-out',
      className,
    ].join(' ');
  }, [className]);

  return (
    <main className='min-w-0 flex-1'>
      <div className={containerClasses}>
        {allowWidthToggle && (
          <WidthSwitcher
            currentWidth={width}
            onChangeWidth={applyWidthPreference}
          />
        )}
        {children}
      </div>
    </main>
  );
}
