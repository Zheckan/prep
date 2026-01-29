import type { NotesAreaProps } from '@/types';

export const NotesArea = ({
  placeholder = 'Add your notes here...',
  minHeight = 'min-h-[200px]',
}: NotesAreaProps) => {
  return (
    <div
      className={`${minHeight} rounded-lg border border-zinc-700/60 border-dashed bg-zinc-900/30 p-4 text-zinc-400`}
    >
      <p className='text-sm italic'>{placeholder}</p>
    </div>
  );
};
