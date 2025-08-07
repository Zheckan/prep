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
          Any interview prep
        </h1>
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
              disabled={section.inProgress}
              key={`${section.title}-${section.level}`}
              onClick={() => router.push(section.href)}
              type='button'
            >
              <div className='flex-grow'>
                <div className='mb-2'>
                  <h2 className='font-bold text-xl text-zinc-100'>
                    {section.title}
                  </h2>
                  {section.level && (
                    <span className='font-medium text-sm text-yellow-500'>
                      {section.level}
                    </span>
                  )}
                  {section.inProgress && (
                    <span className='ml-2 text-red-400 text-sm'>
                      (in progress)
                    </span>
                  )}
                </div>
                <p className='mb-4 text-sm text-zinc-400 leading-relaxed'>
                  {section.description}
                </p>
              </div>
              <div className='flex items-center font-medium text-sm text-zinc-500'>
                {section.inProgress ? 'Coming soon...' : 'Start learning →'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
