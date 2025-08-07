'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BookOpenCheck, House } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { PageHeaderProps } from '@/types';

export const PageHeader = ({
  description,
  title,
  topicHome,
}: PageHeaderProps) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const currentScrollY = window.scrollY;
        setIsScrolled(
          currentScrollY > 20 && currentScrollY > lastScrollY.current
        );
        lastScrollY.current = currentScrollY;
      });
    };

    setIsInitialLoad(false);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Expose current header height as a CSS variable for other components
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    const current = isInitialLoad || !isScrolled ? '128px' : '72px';
    document.documentElement.style.setProperty('--page-header-height', current);
  }, [isInitialLoad, isScrolled]);

  return (
    <motion.div
      animate={{
        height: isInitialLoad || !isScrolled ? '128px' : '72px',
      }}
      className='glass-strong fixed top-0 right-0 left-0 z-50'
      id='page-header'
      initial={{ height: '128px' }}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
    >
      <div className='mx-auto h-full max-w-4xl px-6'>
        <div className='flex h-full items-center justify-between'>
          <div className='flex-1'>
            <motion.h1
              className='font-bold text-3xl text-white md:text-4xl'
              layout
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {title}
            </motion.h1>
            <AnimatePresence>
              {(isInitialLoad || !isScrolled) && (
                <motion.p
                  className='text-zinc-300'
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
