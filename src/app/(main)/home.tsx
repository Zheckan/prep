'use client';
import { useRouter } from 'next/navigation';
import type { Section } from '@/types';

const sections: Section[] = [
  {
    href: '/frontend/junior',
    title: 'Frontend Development',
    level: 'Junior Level',
    description:
      'HTML & CSS, JavaScript fundamentals, React basics, API integration, and essential debugging tools',
    inProgress: false,
  },
];

export default function HomeComponent() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4 py-16'>
      <div className='mb-12 text-center'>
        <p className='mb-2 font-medium text-xs text-yellow-500 uppercase tracking-widest'>
          Interview preparation
        </p>
        <h1 className='text-balance font-bold text-3xl text-white md:text-4xl lg:text-5xl'>
          Any interview prep
        </h1>
        <p className='mt-3 text-sm text-zinc-500'>
          Choose a topic to start preparing
        </p>
      </div>

      <div className='grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {sections.map((section) => (
          <button
            className='group flex flex-col rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 text-left backdrop-blur-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60'
            disabled={section.inProgress}
            key={`${section.title}-${section.level}`}
            onClick={() => router.push(section.href)}
            type='button'
          >
            <div className='flex-grow'>
              {section.level && (
                <span className='mb-2 inline-block rounded-full bg-yellow-500/10 px-2.5 py-0.5 font-medium text-[11px] text-yellow-500'>
                  {section.level}
                </span>
              )}
              <h2 className='mb-1.5 font-semibold text-lg text-white'>
                {section.title}
              </h2>
              {section.inProgress && (
                <span className='mb-2 inline-block text-red-400/80 text-xs'>
                  In progress
                </span>
              )}
              <p className='text-sm text-zinc-400 leading-relaxed'>
                {section.description}
              </p>
            </div>
            <div className='mt-4 flex items-center font-medium text-sm text-zinc-600 transition-colors group-hover:text-zinc-400'>
              {section.inProgress ? 'Coming soon' : 'Start learning'}
              <span className='ml-1 transition-transform group-hover:translate-x-0.5'>
                &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
