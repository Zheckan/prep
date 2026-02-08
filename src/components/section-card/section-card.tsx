import { slugify } from '@/helpers/slugify';
import type { SectionCardProps } from '@/types';

export const SectionCard = ({ title, children }: SectionCardProps) => {
  const id = slugify(title);
  return (
    <section
      className='mb-10 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6 sm:p-8'
      id={id}
    >
      <h2
        className='mb-5 border-[var(--border-strong)] border-b pb-3 font-bold text-2xl text-[var(--foreground)]'
        id={id}
      >
        <span className='text-gradient'>{title}</span>
      </h2>
      <div className='space-y-4 text-[var(--foreground)] leading-relaxed'>
        {children}
      </div>
    </section>
  );
};
