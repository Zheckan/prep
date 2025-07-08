'use client';

import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('h2[id], h3[id]')
    );
    const mapped = headings.map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    }));
    setItems(mapped);
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
    <nav className='fixed top-20 left-0 z-40'>
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
            {items.map((item) => (
              <li className={item.level === 3 ? 'ml-4' : ''} key={item.id}>
                <a
                  className='hover:text-yellow-500'
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
          <button
            className='-right-6 absolute top-2 hidden md:block'
            onClick={() => setPinned(!pinned)}
            type='button'
          >
            <Pin className={pinned ? 'fill-white' : ''} size={20} />
          </button>
        </motion.div>
      </button>
    </nav>
  );
};
