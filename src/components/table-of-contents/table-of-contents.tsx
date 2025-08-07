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

    // Initial update with delay to ensure content is rendered
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

  const handleMouseLeave = () => {
    if (!pinned) {
      setOpen(false);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!pinned) {
      setOpen(false);
    }

    // Prevent default navigation and handle scroll offset without URL change
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Use max header height (140px) + padding for consistent offset
        const maxHeaderOffset = 140 + 20;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - maxHeaderOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleTriggerClick = () => {
    setOpen(!open);
  };

  // Handle click outside on mobile
  useEffect(() => {
    openRef.current = open;
    pinnedRef.current = pinned;
  }, [open, pinned]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth >= 768) return;
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

  // Don't render until content is loaded to prevent flickering
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
        {/* Hover/edge affordance – no explicit button */}
        <div
          aria-hidden='true'
          className='pointer-events-auto absolute top-0 left-0 w-2 md:w-3'
          onMouseEnter={() => setOpen(true)}
          onTouchStart={handleTriggerClick}
          style={{
            height: `calc(100dvh - var(--page-header-height, ${headerHeight}px))`,
          }}
        />

        {/* Preview hint when closed - same height as open state */}
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
            {/* Soft glow hint */}
            <div
              className='h-full w-full opacity-80'
              style={{
                background:
                  'linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0))',
              }}
            />
            <div className='absolute inset-y-0 right-0 w-px md:hidden' />
          </motion.div>
        )}

        {/* Main menu */}
        <motion.div
          animate={{
            x: open ? 0 : '-100%',
            opacity: open ? 1 : 0,
          }}
          className='scrollbar-hide glass pointer-events-auto relative min-w-0 max-w-sm overflow-y-auto p-4 text-sm text-white/95 md:border'
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
            minWidth: '240px',
            height: `calc(100dvh - var(--page-header-height, ${headerHeight}px))`,
          }}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.3,
          }}
        >
          <div className='relative'>
            {/* Pin icon aligned with first section */}
            <button
              className='-right-2 absolute top-0 hidden md:block'
              onClick={() => setPinned(!pinned)}
              type='button'
            >
              {pinned ? (
                <PinOff className='fill-white' size={18} />
              ) : (
                <Pin size={18} />
              )}
            </button>

            <ul className='space-y-3 pr-8'>
              {items.map((section) => (
                <li key={section.id}>
                  {/* Level 1: SectionCard (h2) */}
                  <a
                    className='block break-words text-left font-bold text-white transition-colors duration-200 hover:text-yellow-500 focus-visible:outline-none'
                    href={`#${section.id}`}
                    onClick={handleLinkClick}
                  >
                    {section.text}
                  </a>

                  {section.children.length > 0 && (
                    <ul className='mt-2 space-y-1 border-zinc-600 border-l pl-4'>
                      {section.children.map((child) => {
                        // Check if this is a Header (h3) or Subheader (h4)
                        const isSubheader = child.level === 4;

                        return (
                          <li key={child.id}>
                            {isSubheader ? (
                              /* Level 3: Subheader (h4) with double border */
                              <a
                                className='block break-words border-zinc-600 border-l pl-4 text-left text-xs text-zinc-400 leading-relaxed transition-colors duration-200 hover:text-yellow-500 focus-visible:outline-none'
                                href={`#${child.id}`}
                                onClick={handleLinkClick}
                              >
                                {child.text}
                              </a>
                            ) : (
                              /* Level 2: Header (h3) */
                              <a
                                className='block break-words text-left text-gray-200 text-sm transition-colors duration-200 hover:text-yellow-500 focus-visible:outline-none'
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
