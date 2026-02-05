'use client';

import { motion } from 'framer-motion';
import { Pin, PinOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { TocHeading, TocItem } from '@/types';

export const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const openRef = useRef(open);
  const pinnedRef = useRef(pinned);

  useEffect(() => {
    const getHeadingLevel = (tagName: string): number => {
      if (tagName === 'H2') {
        return 2;
      }
      if (tagName === 'H3') {
        return 3;
      }
      return 4;
    };

    const createTocItem = (el: HTMLElement): TocHeading => {
      return {
        id: el.id,
        text: el.textContent || '',
        level: getHeadingLevel(el.tagName),
      };
    };

    const updateTOC = () => {
      const headings = Array.from(
        document.querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id]')
      );

      const mapped: TocItem[] = [];

      for (const el of headings) {
        const item = createTocItem(el);

        if (item.level === 2) {
          mapped.push({ id: item.id, text: item.text, children: [] });
        } else {
          const lastSection = mapped.at(-1);
          if (lastSection) {
            lastSection.children.push(item);
          }
        }
      }
      setItems(mapped);
      setIsLoaded(true);
    };

    const timeoutId = setTimeout(updateTOC, 0);

    const header = document.getElementById('page-header');
    let resizeObserver: ResizeObserver | null = null;
    let updateHeight: (() => void) | null = null;

    if (header) {
      updateHeight = () =>
        setHeaderHeight(header.getBoundingClientRect().height);
      updateHeight();
      resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(header);
    }

    return () => {
      clearTimeout(timeoutId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (window.innerWidth < 768) {
        touchStartRef.current = e.touches[0].clientX;
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth < 768 && touchStartRef.current !== null) {
        const diff = e.changedTouches[0].clientX - touchStartRef.current;
        if (touchStartRef.current < 30 && diff > 40) {
          setOpen(true);
        }
      }
      touchStartRef.current = null;
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const onTouchTap = (e: TouchEvent) => {
      if (window.innerWidth >= 768) return;
      if (e.touches.length !== 1) return;
      const x = e.touches[0].clientX;
      if (x < 30) {
        setOpen(true);
      }
    };
    window.addEventListener('touchstart', onTouchTap, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchTap);
    };
  }, []);

  const handleMouseLeave = () => {
    if (!pinned) {
      setOpen(false);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!pinned) {
      setOpen(false);
    }

    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (
          typeof history !== 'undefined' &&
          typeof history.replaceState === 'function'
        ) {
          history.replaceState(null, '', href);
        }
      }
    }
  };

  const handleTriggerClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    openRef.current = open;
    pinnedRef.current = pinned;
  }, [open, pinned]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth >= 768) return;
      if (pinnedRef.current) {
        setPinned(false);
      }
      if (!openRef.current || pinnedRef.current) {
        return;
      }
      const target = event.target as Element;
      const tocNav = document.querySelector('nav[style*="top:"]');
      const tocContent = tocNav?.querySelector('.scrollbar-hide');

      if (tocContent && !tocContent.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <nav
      className='pointer-events-none fixed left-0 z-40'
      style={{
        top: `var(--page-header-height, ${headerHeight}px)`,
        transition: 'top 0.28s ease-in-out',
      }}
    >
      <div className='relative'>
        <div
          aria-hidden='true'
          className='pointer-events-auto absolute top-0 left-0 w-3 md:w-4'
          onMouseEnter={() => setOpen(true)}
          onTouchStart={handleTriggerClick}
          style={{
            height: `calc(100dvh - var(--page-header-height, ${headerHeight}px))`,
          }}
        />

        {!open && (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className='pointer-events-none absolute top-0 left-0 w-2 md:w-3'
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, x: -16 }}
            style={{
              height: `calc(100dvh - var(--page-header-height, ${headerHeight}px))`,
            }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
          >
            <div
              className='h-full w-full opacity-60'
              style={{
                background:
                  'linear-gradient(to right, rgba(99, 102, 241, 0.3), transparent)',
              }}
            />
            <div className='absolute inset-y-0 right-0 w-px md:hidden' />
          </motion.div>
        )}

        <motion.div
          animate={{
            x: open ? 0 : '-100%',
            opacity: open ? 1 : 0,
          }}
          className='scrollbar-hide glass pointer-events-auto relative min-w-[260px] max-w-sm overflow-y-auto p-4 text-[var(--foreground)] text-sm md:border'
          initial={{
            x: '-100%',
            opacity: 0,
          }}
          onBlur={handleMouseLeave}
          onFocus={() => setOpen(true)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            width: 'fit-content',
            height: `calc(100dvh - var(--page-header-height, ${headerHeight}px))`,
          }}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.3,
          }}
        >
          <div className='relative'>
            <button
              className='-right-2 absolute top-0 hidden md:block'
              onClick={() => setPinned(!pinned)}
              type='button'
            >
              {pinned ? (
                <PinOff className='fill-[var(--accent-light)]' size={18} />
              ) : (
                <Pin className='text-[var(--muted)]' size={18} />
              )}
            </button>

            <ul className='space-y-3 pr-8'>
              {items.map((section) => (
                <li key={section.id}>
                  <a
                    className='block break-words text-left font-bold text-[var(--foreground)] transition-colors duration-200 hover:text-[var(--accent-light)] focus-visible:outline-none'
                    href={`#${section.id}`}
                    onClick={handleLinkClick}
                  >
                    {section.text}
                  </a>

                  {section.children.length > 0 && (
                    <ul className='mt-2 space-y-1 border-[var(--border)] border-l pl-4'>
                      {section.children.map((child) => {
                        const isSubheader = child.level === 4;

                        return (
                          <li key={child.id}>
                            {isSubheader ? (
                              <a
                                className='block break-words border-[var(--border)] border-l pl-4 text-left text-[var(--muted)] text-xs leading-relaxed transition-colors duration-200 hover:text-[var(--accent-light)] focus-visible:outline-none'
                                href={`#${child.id}`}
                                onClick={handleLinkClick}
                              >
                                {child.text}
                              </a>
                            ) : (
                              <a
                                className='block break-words text-left text-[var(--muted-foreground)] text-sm transition-colors duration-200 hover:text-[var(--accent-light)] focus-visible:outline-none'
                                href={`#${child.id}`}
                                onClick={handleLinkClick}
                              >
                                {child.text}
                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};
