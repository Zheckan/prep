'use client';

import { List, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TocHeading, TocItem } from '@/types';

export const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Build TOC from DOM headings
  useEffect(() => {
    const getHeadingLevel = (tagName: string): number => {
      if (tagName === 'H2') return 2;
      if (tagName === 'H3') return 3;
      return 4;
    };

    const updateTOC = () => {
      const headings = Array.from(
        document.querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id]')
      );

      const mapped: TocItem[] = [];
      for (const el of headings) {
        const item: TocHeading = {
          id: el.id,
          text: el.textContent || '',
          level: getHeadingLevel(el.tagName),
        };

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
    };

    const timeoutId = setTimeout(updateTOC, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (items.length === 0) return;

    const allIds = items.flatMap((item) => [
      item.id,
      ...item.children.map((c) => c.id),
    ]);

    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    // Track which headings are visible
    const visibleSet = new Set<string>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSet.add(entry.target.id);
          } else {
            visibleSet.delete(entry.target.id);
          }
        }

        // Pick the first visible heading in document order
        for (const el of elements) {
          if (visibleSet.has(el.id)) {
            setActiveId(el.id);
            return;
          }
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    for (const el of elements) {
      observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', href);
          setActiveId(targetId);
        }
      }
      setMobileOpen(false);
    },
    []
  );

  if (items.length === 0) return null;

  const tocContent = (
    <ul className='space-y-1'>
      {items.map((section) => {
        const isSectionActive = activeId === section.id;
        return (
          <li key={section.id}>
            <a
              className={`block rounded-md px-3 py-1.5 font-medium text-[13px] transition-colors ${
                isSectionActive
                  ? 'bg-yellow-500/10 text-yellow-500'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              href={`#${section.id}`}
              onClick={handleLinkClick}
            >
              {section.text}
            </a>

            {section.children.length > 0 && (
              <ul className='ml-3 border-zinc-800 border-l'>
                {section.children.map((child) => {
                  const isChildActive = activeId === child.id;
                  const isSubheader = child.level === 4;

                  return (
                    <li key={child.id}>
                      <a
                        className={`block px-3 py-1 transition-colors ${
                          isSubheader
                            ? 'ml-2 border-zinc-800 border-l text-[11px]'
                            : 'text-xs'
                        } ${
                          isChildActive
                            ? 'text-yellow-500'
                            : 'text-zinc-500 hover:text-zinc-300'
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
  );

  return (
    <>
      {/* Desktop: always-visible right sidebar */}
      <aside className='sticky top-[var(--page-header-height,64px)] hidden h-[calc(100dvh-var(--page-header-height,64px))] w-[var(--toc-width,260px)] shrink-0 xl:block'>
        <div className='scrollbar-thin h-full overflow-y-auto px-2 py-6'>
          <p className='mb-3 px-3 font-medium text-[11px] text-zinc-500 uppercase tracking-widest'>
            On this page
          </p>
          {tocContent}
        </div>
      </aside>

      {/* Mobile/tablet: floating button + slide-in drawer */}
      <div className='xl:hidden'>
        <button
          aria-label='Toggle table of contents'
          className='glass fixed right-4 bottom-4 z-50 rounded-full p-3 text-zinc-300 shadow-lg transition-colors hover:text-white'
          onClick={() => setMobileOpen(!mobileOpen)}
          type='button'
        >
          {mobileOpen ? <X size={20} /> : <List size={20} />}
        </button>

        {mobileOpen && (
          <>
            <div
              aria-label='Close table of contents'
              className='fixed inset-0 z-40 bg-black/50'
              onClick={() => setMobileOpen(false)}
              onKeyDown={(e) => e.key === 'Escape' && setMobileOpen(false)}
              role='button'
              tabIndex={-1}
            />
            <nav className='glass fixed top-0 right-0 z-50 h-full w-[280px] overflow-y-auto p-6 pt-16'>
              <p className='mb-3 font-medium text-[11px] text-zinc-500 uppercase tracking-widest'>
                On this page
              </p>
              {tocContent}
            </nav>
          </>
        )}
      </div>
    </>
  );
};
