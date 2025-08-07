'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BookOpenCheck, House } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  topicHome?: string;
}

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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mark as no longer initial load after first scroll
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }

      if (currentScrollY > 20) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setIsScrolled(true);
        } else {
          // Scrolling up
          setIsScrolled(false);
        }
      } else {
        setIsScrolled(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInitialLoad]);

  return (
    <motion.div
      animate={{
        height: isInitialLoad || !isScrolled ? '140px' : '80px',
      }}
      className='glass-strong fixed top-0 right-0 left-0 z-50'
      id='page-header'
      initial={{ height: '140px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='mx-auto h-full max-w-4xl px-6'>
        <div className='flex h-full items-center justify-between'>
          <div className='flex-1'>
            <motion.h1
              className='font-bold text-3xl text-white md:text-4xl'
              layout
              transition={{ duration: 0.3, ease: 'easeInOut' }}
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
