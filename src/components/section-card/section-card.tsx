import { slugify } from '@/helpers/slugify';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export const SectionCard = ({ title, children }: SectionCardProps) => {
  const id = slugify(title);
  return (
    <section className='mb-12 border border-zinc-800 bg-zinc-900 p-6' id={id}>
      <h2
        className='mb-4 border-zinc-700 border-b pb-2 font-bold text-2xl text-white'
        id={id}
      >
        {title}
      </h2>
      <div className='space-y-4 text-white leading-relaxed'>{children}</div>
    </section>
  );
};
