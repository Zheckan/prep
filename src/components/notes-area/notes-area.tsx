interface NotesAreaProps {
  placeholder?: string;
  minHeight?: string;
}

export const NotesArea = ({
  placeholder = 'Add your notes here...',
  minHeight = 'min-h-[200px]',
}: NotesAreaProps) => {
  return (
    <div
      className={`${minHeight} bg-zinc-800 border border-zinc-700 p-4 text-gray-50`}
    >
      <p className='italic'>{placeholder}</p>
    </div>
  );
};
