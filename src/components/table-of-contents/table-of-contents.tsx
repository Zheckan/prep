'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { List, Pin, PinOff, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TocHeading, TocItem } from '@/types';

export const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    return () => clearTimeout(timeoutId);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    if (!isLoaded || items.length === 0) return;

    const allIds = items.flatMap((item) => [
      item.id,
      ...item.children.map((c) => c.id),
    ]);

    const headingElements = allIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
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

    for (const el of headingElements) {
      observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isLoaded, items]);

  // Close on click outside (using ref, not fragile query)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pinned) return;
      if (!open) return;
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, pinned]);

  // Mobile swipe to open
  const touchStartRef = useRef<number | null>(null);
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

  // Disable pinning on mobile
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handleChange = () => {
      if (mq.matches && pinned) setPinned(false);
    };
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
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
          history.replaceState(null, '', href);
        }
      }
    },
    [pinned]
  );

  const isActive = (id: string) => activeId === id;

  const isParentActive = (section: TocItem) =>
    activeId === section.id || section.children.some((c) => c.id === activeId);

  if (!isLoaded) return null;

  return (
    <>
      {/* Toggle button - visible on mobile and desktop when TOC is closed */}
      <button
        aria-label='Open table of contents'
        className={`fixed left-4 z-50 rounded-lg p-2 transition-all duration-200 ${
          open ? 'pointer-events-none opacity-0' : 'opacity-100'
        } glass hover:bg-[var(--surface-2)]`}
        onClick={() => setOpen(true)}
        style={{
          top: 'calc(var(--page-header-height, 128px) + 12px)',
          transition: 'top 0.28s ease-in-out, opacity 0.2s ease',
        }}
        type='button'
      >
        <List className='text-[var(--foreground-muted)]' size={18} />
      </button>

      {/* Backdrop on mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1 }}
            className='fixed inset-0 z-40 bg-black/40 md:hidden'
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => {
              if (!pinned) setOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* TOC panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            animate={{ x: 0, opacity: 1 }}
            className='scrollbar-hide glass fixed left-0 z-50 overflow-y-auto p-5 text-sm md:max-w-xs'
            exit={{ x: '-100%', opacity: 0 }}
            initial={{ x: '-100%', opacity: 0 }}
            ref={navRef}
            style={{
              top: 'var(--page-header-height, 128px)',
              height: 'calc(100dvh - var(--page-header-height, 128px))',
              width: 'min(300px, 85vw)',
              transition: 'top 0.28s ease-in-out',
            }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: 0.25,
            }}
          >
            {/* Header row */}
            <div className='mb-4 flex items-center justify-between'>
              <span className='font-semibold text-[var(--foreground-muted)] text-xs uppercase tracking-widest'>
                Contents
              </span>
              <div className='flex items-center gap-1'>
                <button
                  aria-label={
                    pinned ? 'Unpin table of contents' : 'Pin table of contents'
                  }
                  className='hidden rounded-md p-1.5 text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--accent)] md:block'
                  onClick={() => setPinned(!pinned)}
                  type='button'
                >
                  {pinned ? <PinOff size={14} /> : <Pin size={14} />}
                </button>
                <button
                  aria-label='Close table of contents'
                  className='rounded-md p-1.5 text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]'
                  onClick={() => setOpen(false)}
                  type='button'
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* TOC tree */}
            <ul className='space-y-2'>
              {items.map((section) => (
                <li key={section.id}>
                  <a
                    className={`block rounded-md px-2 py-1.5 font-medium text-sm transition-all duration-150 ${
                      isParentActive(section)
                        ? 'bg-[var(--accent-glow)] text-[var(--accent)]'
                        : 'text-[var(--foreground)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)]'
                    }`}
                    href={`#${section.id}`}
                    onClick={handleLinkClick}
                  >
                    {section.text}
                  </a>

                  {section.children.length > 0 && (
                    <ul className='mt-1 ml-3 space-y-0.5 border-[var(--border)] border-l pl-3'>
                      {section.children.map((child) => {
                        const isSubheader = child.level === 4;
                        return (
                          <li key={child.id}>
                            <a
                              className={`block rounded-md px-2 py-1 transition-all duration-150 ${
                                isSubheader ? 'text-xs' : 'text-sm'
                              } ${isSubheader ? 'ml-2' : ''} ${
                                isActive(child.id)
                                  ? 'bg-[var(--accent-glow)] text-[var(--accent)]'
                                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-1)] hover:text-[var(--accent)]'
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
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
