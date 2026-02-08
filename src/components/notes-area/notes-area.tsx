import type { NotesAreaProps } from '@/types';

export const NotesArea = ({
  placeholder = 'Add your notes here...',
  minHeight = 'min-h-[200px]',
}: NotesAreaProps) => {
  return (
    <div
      className={`${minHeight} rounded-lg border border-[var(--border)] border-dashed bg-[var(--card-bg)] p-4 text-[var(--muted)]`}
    >
      <p className='text-sm italic'>{placeholder}</p>
    </div>
  );
};
