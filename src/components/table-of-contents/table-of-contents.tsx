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

const parseHeadings = () => {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>('h2[id], h3[id]')
  );
  const mapped: TocItem[] = [];
  for (const el of headings) {
    const item = {
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    } as TocHeading;
    if (item.level === 2) {
      mapped.push({ id: item.id, text: item.text, children: [] });
    } else if (mapped.length > 0) {
      const last = mapped.at(-1);
      if (last) {
        last.children.push(item);
      }
    }
  }
  return mapped;
};

export const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setItems(parseHeadings());
  }, []);

  useEffect(() => {
    const header = document.getElementById('page-header');
    if (!header) {
      return;
    }
    const updateHeight = () =>
      setHeaderHeight(header.getBoundingClientRect().height);
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(header);
    window.addEventListener('scroll', updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateHeight);
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

  return (
    <nav className='fixed left-0 z-40' style={{ top: headerHeight }}>
      <button
        className='group'
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={handleMouseLeave}
        type='button'
      >
        <motion.div
          animate={{ x: open ? 0 : '-100%' }}
          className='relative max-h-[80vh] w-56 overflow-y-auto bg-zinc-900/90 p-4 pr-6 text-sm text-white backdrop-blur-lg'
        >
          <ul className='space-y-2'>
            {items.map((section) => (
              <li key={section.id}>
                <a
                  className='font-medium hover:text-yellow-500'
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                >
                  {section.text}
                </a>
                {section.children.length > 0 && (
                  <ul className='mt-1 space-y-1 pl-4'>
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          className='hover:text-yellow-500'
                          href={`#${child.id}`}
                          onClick={() => setOpen(false)}
                        >
                          {child.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button
            className='-right-6 absolute top-2 hidden md:block'
            onClick={() => setPinned(!pinned)}
            type='button'
          >
            {pinned ? (
              <PinOff className='fill-white' size={20} />
            ) : (
              <Pin size={20} />
            )}
          </button>
        </motion.div>
      </button>
    </nav>
  );
};
