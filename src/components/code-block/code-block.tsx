interface CodeBlockProps {
  comment: string;
  children: React.ReactNode;
}

export const CodeBlock = ({ comment, children }: CodeBlockProps) => {
  return (
    <div className='bg-zinc-800 border border-zinc-700 p-4 text-sm font-mono'>
      <div className='text-gray-50'>{`/* ${comment} */`}</div>
      {children}
    </div>
  );
};
