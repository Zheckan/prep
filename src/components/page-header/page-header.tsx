'use client';

import { BookOpenCheck, House } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { PageHeaderProps } from '@/types';

export const PageHeader = ({
  description,
  title,
  topicHome,
}: PageHeaderProps) => {
  const router = useRouter();

  return (
    <header
      className='glass-strong sticky top-0 z-50 w-full'
      id='page-header'
      style={{ height: 'var(--page-header-height, 64px)' }}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6'>
        <div className='flex min-w-0 flex-1 items-center gap-3'>
          <div className='min-w-0'>
            <h1 className='truncate font-semibold text-base text-white sm:text-lg'>
              {title}
            </h1>
            <p className='hidden truncate text-xs text-zinc-400 sm:block'>
              {description}
            </p>
          </div>
        </div>

        <nav className='flex items-center gap-1'>
          {topicHome && (
            <button
              aria-label='Go to topic home'
              className='rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white'
              onClick={() => router.push(topicHome)}
              type='button'
            >
              <BookOpenCheck size={18} />
            </button>
          )}
          <button
            aria-label='Go to home page'
            className='rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white'
            onClick={() => router.push('/')}
            type='button'
          >
            <House size={18} />
          </button>
        </nav>
      </div>
    </header>
  );
};
