'use client';

import { motion } from 'framer-motion';
import { Pin, PinOff } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface TocItem {
  id: string;
  text: string;
  children: TocHeading[];
}

export const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

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
    };

    // Initial update with delay to ensure content is rendered
    const timeoutId = setTimeout(updateTOC, 1000);

    const header = document.getElementById('page-header');
    let resizeObserver: ResizeObserver | null = null;
    let updateHeight: (() => void) | null = null;

    if (header) {
      updateHeight = () =>
        setHeaderHeight(header.getBoundingClientRect().height);
      updateHeight();
      resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(header);
      window.addEventListener('scroll', updateHeight);
    }

    return () => {
      clearTimeout(timeoutId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (updateHeight) {
        window.removeEventListener('scroll', updateHeight);
      }
    };
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth < 768) {
        setTouchStart(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth < 768 && touchStart !== null) {
        const diff = e.changedTouches[0].clientX - touchStart;
        if (touchStart < 30 && diff > 40) {
          setOpen(true);
        }
      }
      setTouchStart(null);
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart]);

  const handleMouseLeave = () => {
    if (!pinned) {
      setOpen(false);
    }
  };

  const handleLinkClick = () => {
    if (!pinned) {
      setOpen(false);
    }
  };

  return (
    <nav className='fixed left-0 z-40' style={{ top: headerHeight }}>
      <div className='relative'>
        {/* Hint border when closed */}
        {!open && (
          <div
            className='absolute top-0 left-0 h-full w-1 border-white/10 border-r bg-white/20'
            style={{ right: '-4px' }}
          />
        )}

        <button
          className='group'
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={handleMouseLeave}
          type='button'
        >
          <motion.div
            animate={{ x: open ? 0 : '-100%' }}
            className='scrollbar-hide relative max-h-[80vh] min-w-0 max-w-sm overflow-y-auto border-white/10 border-r bg-black/30 p-4 text-sm text-white backdrop-blur-xl backdrop-saturate-150'
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: 'fit-content',
              minWidth: '240px',
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
                      className='block break-words text-left font-bold text-white transition-colors duration-200 hover:text-yellow-500'
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
                                /* Level 3: Subheader (h4) with || indicator */
                                <div className='flex items-start gap-2 pl-4'>
                                  <span className='mt-1 text-xs text-zinc-500'>
                                    ||
                                  </span>
                                  <a
                                    className='block break-words text-left text-gray-400 text-xs leading-relaxed transition-colors duration-200 hover:text-yellow-500'
                                    href={`#${child.id}`}
                                    onClick={handleLinkClick}
                                  >
                                    {child.text}
                                  </a>
                                </div>
                              ) : (
                                /* Level 2: Header (h3) */
                                <a
                                  className='block break-words text-left text-gray-200 text-sm transition-colors duration-200 hover:text-yellow-500'
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
        </button>
      </div>
    </nav>
  );
};
