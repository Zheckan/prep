'use client';
import { useRouter } from 'next/navigation';

type Section = {
  href: string;
  title: string;
  description: string;
  inProgress: boolean;
};

const sections: Section[] = [
  {
    href: '/html&css',
    title: 'HTML & CSS',
    description:
      'Semantic HTML, accessibility basics, Flexbox, Grid, responsive designSemantic HTML, accessibility basics, Flexbox, Grid, responsive design',
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
  // {
  //   href: '#',
  //   title: 'Algorithmic Practice',
  //   description: 'Arrays/strings, time/space complexity, LeetCode problems',
  //   inProgress: true,
  // },
];

export default function HomeComponent() {
  const router = useRouter();

  const totalItems = sections.length;
  const columns = 3;

  const colSpanClasses: { [key: number]: string } = {
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    6: 'md:col-span-6',
  };

  return (
    <div className='min-h-screen flex flex-col items-center py-8 md:justify-center lg:justify-center gap-8'>
      <div className='text-center max-w-6xl px-4'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold font-sans text-balance'>
          Asana Junior Frontend Developer Preparation
        </h1>
        <p className='text-sm text-zinc-400 mb-4 leading-relaxed'>
          (in development, &apos;in progress&apos; parts are not completed)
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl px-4'>
        {sections.map((section, index) => {
          const rowNumber = Math.floor(index / columns);
          const isLastRow =
            rowNumber === Math.floor((totalItems - 1) / columns);

          const itemsOnLastRow = totalItems % columns;
          const itemsOnThisRow =
            isLastRow && itemsOnLastRow > 0 ? itemsOnLastRow : columns;

          const colSpan = Math.round(6 / itemsOnThisRow);

          const className = `bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-zinc-800 cursor-pointer hover:border-zinc-600 ${
            colSpanClasses[colSpan]
          }`;

          return (
            <div
              key={section.title}
              onClick={() => router.push(section.href)}
              className={`${className} flex flex-col`}
            >
              <div className='flex-grow'>
                <h2 className='text-xl font-bold text-zinc-100 mb-3'>
                  {section.title}{' '}
                  {section.inProgress && (
                    <span className='text-red-400'>(in progress)</span>
                  )}
                </h2>
                <p className='text-sm text-zinc-400 mb-4 leading-relaxed'>
                  {section.description}
                </p>
              </div>
              <div className='flex items-center text-zinc-500 font-medium text-sm'>
                Learn more →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
