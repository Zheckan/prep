'use client';

import { motion } from 'framer-motion';
import { List, Pin, PinOff } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TocHeading, TocItem } from '@/types';

export const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const touchStartRef = useRef<number | null>(null);
  const openRef = useRef(open);
  const pinnedRef = useRef(pinned);

  // Build TOC from headings
  useEffect(() => {
    const getHeadingLevel = (tagName: string): number => {
      if (tagName === 'H2') return 2;
      if (tagName === 'H3') return 3;
      return 4;
    };

    const createTocItem = (el: HTMLElement): TocHeading => ({
      id: el.id,
      text: el.textContent || '',
      level: getHeadingLevel(el.tagName),
    });

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

    if (header) {
      const updateHeight = () =>
        setHeaderHeight(header.getBoundingClientRect().height);
      updateHeight();
      resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(header);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver?.disconnect();
    };
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    if (!isLoaded) return;

    const headings = document.querySelectorAll<HTMLElement>(
      'h2[id], h3[id], h4[id]'
    );
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [isLoaded]);

  // Touch gestures for mobile
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
      if (e.touches[0].clientX < 30) {
        setOpen(true);
      }
    };
    window.addEventListener('touchstart', onTouchTap, { passive: true });
    return () => window.removeEventListener('touchstart', onTouchTap);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!pinned) setOpen(false);
  }, [pinned]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!pinned) setOpen(false);

      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (typeof history !== 'undefined') {
            history.replaceState(null, '', href);
          }
          setActiveId(targetId);
        }
      }
    },
    [pinned]
  );

  const handleTriggerClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Keep refs in sync
  useEffect(() => {
    openRef.current = open;
    pinnedRef.current = pinned;
  }, [open, pinned]);

  // Close on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth >= 768) return;
      if (pinnedRef.current) setPinned(false);
      if (!openRef.current || pinnedRef.current) return;

      const target = event.target as Element;
      const tocNav = document.querySelector('nav[style*="top:"]');
      const tocContent = tocNav?.querySelector('.scrollbar-thin');
      if (tocContent && !tocContent.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine if a section or its children are active
  const isSectionActive = (section: TocItem) => {
    if (activeId === section.id) return true;
    return section.children.some((child) => child.id === activeId);
  };

  if (!isLoaded) return null;

  return (
    <nav
      aria-label='Table of contents'
      className='pointer-events-none fixed left-0 z-40'
      style={{
        top: `var(--page-header-height, ${headerHeight}px)`,
        transition: 'top 0.28s ease-in-out',
      }}
    >
      <div className='relative'>
        {/* Hover trigger zone */}
        <div
          aria-hidden='true'
          className='pointer-events-auto absolute top-0 left-0 w-3 md:w-4'
          onMouseEnter={() => setOpen(true)}
          onTouchStart={handleTriggerClick}
          style={{
            height: `calc(100dvh - var(--page-header-height, ${headerHeight}px))`,
          }}
        />

        {/* Closed hint - subtle accent line */}
        {!open && (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className='pointer-events-none absolute top-0 left-0 w-0.5'
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, x: -4 }}
            style={{
              height: `calc(100dvh - var(--page-header-height, ${headerHeight}px))`,
              background: 'var(--accent-gradient)',
              opacity: 0.3,
            }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
          />
        )}

        {/* Mobile FAB trigger */}
        <motion.button
          animate={{ opacity: 1, scale: 1 }}
          aria-label='Open table of contents'
          className='pointer-events-auto fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg md:hidden'
          initial={{ opacity: 0, scale: 0.8 }}
          onClick={handleTriggerClick}
          style={{
            background: 'var(--accent)',
            color: '#0b0f1a',
            display: open ? 'none' : 'flex',
          }}
          type='button'
          whileTap={{ scale: 0.9 }}
        >
          <List size={20} />
        </motion.button>

        {/* Main panel */}
        <motion.div
          animate={{
            x: open ? 0 : '-100%',
            opacity: open ? 1 : 0,
          }}
          className='scrollbar-thin glass pointer-events-auto relative min-w-[240px] max-w-[280px] overflow-y-auto p-4 pr-2 text-sm md:border'
          initial={{ x: '-100%', opacity: 0 }}
          onBlur={handleMouseLeave}
          onFocus={() => setOpen(true)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            width: 'fit-content',
            height: `calc(100dvh - var(--page-header-height, ${headerHeight}px))`,
          }}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.25,
          }}
        >
          <div className='relative'>
            {/* Header */}
            <div className='mb-3 flex items-center justify-between pr-1'>
              <span className='font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider'>
                Contents
              </span>
              <button
                aria-label={
                  pinned ? 'Unpin table of contents' : 'Pin table of contents'
                }
                className='hidden rounded p-1 text-[var(--muted)] transition-colors hover:text-[var(--accent)] md:block'
                onClick={() => setPinned(!pinned)}
                type='button'
              >
                {pinned ? <PinOff size={14} /> : <Pin size={14} />}
              </button>
            </div>

            <ul className='space-y-1'>
              {items.map((section) => {
                const sectionIsActive = isSectionActive(section);
                const headingIsActive = activeId === section.id;

                let headingColorClass = 'text-[var(--muted)]';
                if (headingIsActive) {
                  headingColorClass =
                    'bg-[var(--accent)]/10 text-[var(--accent)]';
                } else if (sectionIsActive) {
                  headingColorClass = 'text-[var(--foreground)]';
                }

                return (
                  <li key={section.id}>
                    <a
                      className={`block rounded-md px-2 py-1.5 text-left font-semibold text-xs transition-all duration-200 hover:text-[var(--accent)] focus-visible:outline-none ${headingColorClass}`}
                      href={`#${section.id}`}
                      onClick={handleLinkClick}
                    >
                      {section.text}
                    </a>

                    {section.children.length > 0 && (
                      <ul className='mt-0.5 ml-2 space-y-0.5 border-[var(--border)] border-l'>
                        {section.children.map((child) => {
                          const isChildActive = activeId === child.id;
                          const isSubheader = child.level === 4;

                          return (
                            <li key={child.id}>
                              <a
                                className={`block rounded-md py-1 transition-all duration-200 hover:text-[var(--accent)] focus-visible:outline-none ${
                                  isSubheader
                                    ? 'pl-6 text-[10px]'
                                    : 'pl-3 text-[11px]'
                                } ${
                                  isChildActive
                                    ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                                    : 'text-[var(--muted)]'
                                }`}
                                href={`#${child.id}`}
                                onClick={handleLinkClick}
                              >
                                {child.text}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};
