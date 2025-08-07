'use client';

import Image from 'next/image';

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className='fixed inset-0'
      style={{ zIndex: -10, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <Image
        alt=''
        className='absolute inset-0 h-full w-full object-cover'
        fetchPriority='high'
        fill
        priority
        sizes='100vw'
        src='https://persistent.oaistatic.com/burrito-nux/1920.webp'
        style={{ transform: 'scale(1.02)', opacity: 0.4, filter: 'blur(24px)' }}
      />
      <div
        className='absolute inset-0'
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0), var(--background))',
        }}
      />
    </div>
  );
}

export default AmbientBackground;
