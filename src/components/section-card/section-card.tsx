import { slugify } from '@/helpers/slugify';
import type { SectionCardProps } from '@/types';

export const SectionCard = ({ title, children }: SectionCardProps) => {
  const id = slugify(title);
  return (
    <section
      className='mb-12 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 backdrop-blur-sm md:p-8'
      id={id}
    >
      <h2
        className='mb-6 border-[var(--border)] border-b pb-3 font-bold text-2xl text-[var(--foreground)]'
        id={id}
      >
        {title}
      </h2>
      <div className='space-y-4 text-[var(--foreground)] leading-relaxed'>
        {children}
      </div>
    </section>
  );
};
