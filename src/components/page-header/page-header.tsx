'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BookOpenCheck, House } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PageHeaderProps } from '@/types';

export const PageHeader = ({
  description,
  title,
  topicHome,
}: PageHeaderProps) => {
  type MediaQueryListWithLegacy = MediaQueryList & {
    addListener: (listener: (e: MediaQueryListEvent) => void) => void;
    removeListener: (listener: (e: MediaQueryListEvent) => void) => void;
  };

  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const lastScrollY = useRef(0);
  const [isHiddenOnMobile, setIsHiddenOnMobile] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const isMobile = useRef(false);
  const downwardAccumPx = useRef(0);
  const upwardAccumPx = useRef(0);
  const isHiddenOnMobileRef = useRef(false);

  // Threshold constants for mobile hysteresis
  const JITTER_PX = 5;
  const HIDE_THRESHOLD_PX = 24;
  const SHOW_THRESHOLD_PX = 64;

  useEffect(() => {
    isHiddenOnMobileRef.current = isHiddenOnMobile;
  }, [isHiddenOnMobile]);

  const resetNonMobileState = useCallback(() => {
    downwardAccumPx.current = 0;
    upwardAccumPx.current = 0;
    if (isHiddenOnMobileRef.current) setIsHiddenOnMobile(false);
  }, []);

  const accumulateDown = useCallback((delta: number) => {
    downwardAccumPx.current += delta;
    upwardAccumPx.current = 0;
  }, []);

  const accumulateUp = useCallback((delta: number) => {
    upwardAccumPx.current += -delta;
    downwardAccumPx.current = 0;
  }, []);

  const maybeHideOnMobile = useCallback((currentScrollY: number) => {
    if (
      !isHiddenOnMobileRef.current &&
      currentScrollY > 16 &&
      downwardAccumPx.current > HIDE_THRESHOLD_PX
    ) {
      setIsHiddenOnMobile(true);
    }
  }, []);

  const maybeShowOnMobile = useCallback(() => {
    if (
      isHiddenOnMobileRef.current &&
      upwardAccumPx.current > SHOW_THRESHOLD_PX
    ) {
      setIsHiddenOnMobile(false);
    }
  }, []);

  const maybeResetAtTop = useCallback((currentScrollY: number) => {
    if (currentScrollY < 2 && isHiddenOnMobileRef.current) {
      setIsHiddenOnMobile(false);
    }
  }, []);

  const handleMobileScroll = useCallback(
    (currentScrollY: number, delta: number) => {
      if (!isMobile.current) {
        resetNonMobileState();
        return;
      }

      const absDelta = Math.abs(delta);
      if (absDelta <= JITTER_PX) {
        maybeResetAtTop(currentScrollY);
        return;
      }

      if (delta > 0) {
        accumulateDown(delta);
        maybeHideOnMobile(currentScrollY);
      } else if (delta < 0) {
        accumulateUp(delta);
        maybeShowOnMobile();
      }

      maybeResetAtTop(currentScrollY);
    },
    [
      accumulateDown,
      accumulateUp,
      maybeHideOnMobile,
      maybeResetAtTop,
      maybeShowOnMobile,
      resetNonMobileState,
    ]
  );

  // Track mobile breakpoint to enable full hide behavior on small screens
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq: MediaQueryList = window.matchMedia('(max-width: 639px)');
    const setMobileFlag = () => {
      isMobile.current = mq.matches;
      setIsMobileScreen(mq.matches);
    };
    setMobileFlag();
    const hasModernListener = typeof mq.addEventListener === 'function';
    if (hasModernListener) {
      mq.addEventListener('change', setMobileFlag);
    } else {
      (mq as MediaQueryListWithLegacy).addListener(setMobileFlag);
    }
    return () => {
      if (hasModernListener) {
        mq.removeEventListener('change', setMobileFlag);
      } else {
        (mq as MediaQueryListWithLegacy).removeListener(setMobileFlag);
      }
    };
  }, []);

  // Scroll listener with rAF batching
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const currentScrollY = Math.max(0, window.scrollY);
        const delta = currentScrollY - lastScrollY.current;
        // Desktop: collapse based on absolute position to avoid flicker
        if (!isMobile.current) {
          setIsCollapsed(currentScrollY > 80);
        }
        handleMobileScroll(currentScrollY, delta);
        lastScrollY.current = currentScrollY;
      });
    };

    setIsInitialLoad(false);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [handleMobileScroll]);

  // Expose current header height as a CSS variable for other components
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    const expandedHeight = '128px';
    const collapsedHeight = '72px';
    let current: string;
    if (isHiddenOnMobile) {
      current = '0px';
    } else if (isMobileScreen) {
      // On mobile, when visible, keep the header at full height for clear tap targets
      current = expandedHeight;
    } else if (isInitialLoad || !isCollapsed) {
      current = expandedHeight;
    } else {
      current = collapsedHeight;
    }
    document.documentElement.style.setProperty('--page-header-height', current);
  }, [isInitialLoad, isCollapsed, isHiddenOnMobile, isMobileScreen]);

  return (
    <motion.div
      animate={{
        height: ((): string => {
          if (isMobileScreen) return '128px';
          if (isInitialLoad || !isCollapsed) return '128px';
          return '72px';
        })(),
        y: isHiddenOnMobile ? '-100%' : '0%',
      }}
      className='glass-strong fixed top-0 right-0 left-0 z-50'
      id='page-header'
      initial={{ height: '128px', y: '0%' }}
      style={{ willChange: 'height, transform' }}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
    >
      <div className='mx-auto h-full max-w-4xl px-6'>
        <div className='flex h-full items-center justify-between'>
          <div className='flex-1'>
            <motion.h1
              className='font-bold text-2xl text-white sm:text-3xl md:text-4xl'
              layout={!isMobileScreen}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {title}
            </motion.h1>
            <AnimatePresence>
              {(isInitialLoad || !isCollapsed) && (
                <motion.p
                  className='text-sm text-zinc-300 sm:text-base'
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className='flex items-center gap-4'>
            {topicHome && (
              <button
                aria-label='Go to topic home'
                className='rounded-md p-1 text-white transition-colors hover:text-yellow-500'
                onClick={() => router.push(topicHome)}
                type='button'
              >
                <BookOpenCheck size={24} />
              </button>
            )}
            <button
              aria-label='Go to home page'
              className='rounded-md p-1 text-white transition-colors hover:text-yellow-500'
              onClick={() => router.push('/')}
              type='button'
            >
              <House size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
