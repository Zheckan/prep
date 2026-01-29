import { slugify } from '@/helpers/slugify';
import type { SectionCardProps } from '@/types';

export const SectionCard = ({ title, children }: SectionCardProps) => {
  const id = slugify(title);
  return (
    <section
      className='mb-10 rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-5 backdrop-blur-sm sm:p-6'
      id={id}
    >
      <h2
        className='mb-5 flex items-center gap-3 font-semibold text-white text-xl'
        id={id}
      >
        <span className='h-5 w-1 rounded-full bg-yellow-500' />
        {title}
      </h2>
      <div className='space-y-4 text-[15px] text-zinc-200 leading-relaxed'>
        {children}
      </div>
    </section>
  );
};
