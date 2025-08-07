import type { NotesAreaProps } from '@/types';

export const NotesArea = ({
  placeholder = 'Add your notes here...',
  minHeight = 'min-h-[200px]',
}: NotesAreaProps) => {
  return (
    <div
      className={`${minHeight} border border-zinc-700 bg-zinc-800 p-4 text-gray-50`}
    >
      <p className='italic'>{placeholder}</p>
    </div>
  );
};
