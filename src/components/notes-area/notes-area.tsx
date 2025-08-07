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
      className={`${minHeight} border border-[var(--border)] bg-[var(--card-bg)] p-4 text-zinc-100`}
    >
      <p className='text-zinc-400 italic'>{placeholder}</p>
    </div>
  );
};
