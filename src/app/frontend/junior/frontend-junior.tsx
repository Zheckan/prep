'use client';
import { useRouter } from 'next/navigation';
import type { Section } from '@/types';

const sections: Section[] = [
  {
    href: '/frontend/junior/html&css',
    title: 'HTML & CSS',
    description:
      'Semantic HTML, accessibility basics, Flexbox, Grid, responsive design',
    inProgress: false,
  },
  {
    href: '#',
    title: 'JavaScript Fundamentals',
    description: 'ES6+ syntax, scope, closures, async patterns, DOM APIs',
    inProgress: true,
  },
  {
    href: '#',
    title: 'API Integration',
    description: 'fetch/axios, REST, GraphQL, error handling, loading states',
    inProgress: true,
  },
  {
    href: '#',
    title: 'Framework Basics (React)',
    description: 'Components, props, state, hooks, Context API, lifecycle',
    inProgress: true,
  },
  {
    href: '#',
    title: 'Tooling & Debugging',
    description: 'Chrome DevTools, ESLint/Prettier, npm scripts, build tools',
    inProgress: true,
  },
];

export default function FrontendJunior() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4 py-16'>
      <div className='mb-12 text-center'>
        <p className='mb-2 font-medium text-xs text-yellow-500 uppercase tracking-widest'>
          Frontend
        </p>
        <h1 className='text-balance font-bold text-3xl text-white md:text-4xl lg:text-5xl'>
          Junior Developer Preparation
        </h1>
        <p className='mt-3 text-sm text-zinc-500'>
          Topics marked as &ldquo;in progress&rdquo; are still being written
        </p>
      </div>

      <div className='grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {sections.map((section) => (
          <button
            className={`group flex flex-col rounded-xl border p-5 text-left backdrop-blur-sm transition-all duration-200 ${
              section.inProgress
                ? 'cursor-default border-zinc-800/40 bg-zinc-900/20 opacity-60'
                : 'border-zinc-800/60 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60'
            }`}
            disabled={section.inProgress}
            key={section.title}
            onClick={() => !section.inProgress && router.push(section.href)}
            type='button'
          >
            <div className='flex-grow'>
              <h2 className='mb-1 font-semibold text-base text-white'>
                {section.title}
              </h2>
              {section.inProgress && (
                <span className='mb-1.5 inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-500'>
                  In progress
                </span>
              )}
              <p className='text-[13px] text-zinc-400 leading-relaxed'>
                {section.description}
              </p>
            </div>
            {!section.inProgress && (
              <div className='mt-3 flex items-center font-medium text-[13px] text-zinc-600 transition-colors group-hover:text-zinc-400'>
                Start learning
                <span className='ml-1 transition-transform group-hover:translate-x-0.5'>
                  &rarr;
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
