interface CodeSpanProps {
  children: React.ReactNode;
  className?: string;
  size?: 'normal' | 'small';
}

export const CodeSpan = ({
  children,
  className = '',
  size = 'normal',
}: CodeSpanProps) => {
  const sizeClass = size === 'small' ? 'text-sm' : '';

  return (
    <code
      className={`rounded border border-[var(--border)] bg-zinc-900/80 px-2 py-1 font-mono text-zinc-100 ${sizeClass} ${className}`}
    >
      {children}
    </code>
  );
};
