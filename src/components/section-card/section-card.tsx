import { slugify } from '@/helpers/slugify';
import type { SectionCardProps } from '@/types';

export const SectionCard = ({ title, children }: SectionCardProps) => {
  const id = slugify(title);
  return (
    <section
      className='glass-card relative mb-10 overflow-hidden rounded-xl p-6 sm:p-8'
      id={id}
    >
      {/* Top gradient accent */}
      <div
        className='absolute top-0 right-0 left-0 h-px'
        style={{ background: 'var(--accent-gradient)', opacity: 0.4 }}
      />
      <h2
        className='mb-5 border-[var(--border)] border-b pb-3 font-bold text-[var(--foreground)] text-xl sm:text-2xl'
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
