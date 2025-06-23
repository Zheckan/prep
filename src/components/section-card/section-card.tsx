interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export const SectionCard = ({ title, children }: SectionCardProps) => {
  return (
    <section className='mb-12 bg-zinc-900 border border-zinc-800 p-6'>
      <h2 className='text-2xl font-bold text-white mb-4 border-b border-zinc-700 pb-2'>
        {title}
      </h2>
      <div className='space-y-4 text-white leading-relaxed'>{children}</div>
    </section>
  );
};
