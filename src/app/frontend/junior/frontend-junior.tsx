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

  const totalItems = sections.length;
  const columns = 3;

  const colSpanClasses: { [key: number]: string } = {
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    6: 'md:col-span-6',
  };

  return (
    <div className='flex min-h-screen flex-col items-center gap-8 py-8 md:justify-center lg:justify-center'>
      <div className='max-w-6xl px-4 text-center'>
        <h1 className='text-balance font-bold font-sans text-2xl md:text-3xl lg:text-4xl'>
          Junior Frontend Developer Preparation
        </h1>
        <p className='mb-4 text-sm text-zinc-400 leading-relaxed'>
          (in development, &apos;in progress&apos; parts are not completed)
        </p>
      </div>
      <div className='grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-6'>
        {sections.map((section, index) => {
          const rowNumber = Math.floor(index / columns);
          const isLastRow =
            rowNumber === Math.floor((totalItems - 1) / columns);

          const itemsOnLastRow = totalItems % columns;
          const itemsOnThisRow =
            isLastRow && itemsOnLastRow > 0 ? itemsOnLastRow : columns;

          const colSpan = Math.round(6 / itemsOnThisRow);

          const className = `rounded-lg border border-zinc-800 bg-zinc-900/90 p-6 shadow-sm transition-colors duration-200 hover:border-zinc-600 ${
            colSpanClasses[colSpan]
          }`;

          return (
            <button
              className={`${className} flex flex-col text-left`}
              key={section.title}
              onClick={() => router.push(section.href)}
              type='button'
            >
              <div className='flex-grow'>
                <h2 className='mb-3 font-bold text-xl text-zinc-100'>
                  {section.title}{' '}
                  {section.inProgress && (
                    <span className='text-red-400'>(in progress)</span>
                  )}
                </h2>
                <p className='mb-4 text-sm text-zinc-400 leading-relaxed'>
                  {section.description}
                </p>
              </div>
              <div className='flex items-center font-medium text-sm text-zinc-500'>
                Learn more →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
