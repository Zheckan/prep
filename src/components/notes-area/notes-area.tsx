import type { NotesAreaProps } from '@/types';

export const NotesArea = ({
  placeholder = 'Add your notes here...',
  minHeight = 'min-h-[200px]',
}: NotesAreaProps) => {
  return (
    <div
      className={`${minHeight} rounded-xl border border-[var(--border-strong)] border-dashed bg-[var(--surface-1)] p-4 text-[var(--foreground)]`}
    >
      <p className='text-[var(--foreground-muted)] italic'>{placeholder}</p>
    </div>
  );
};
