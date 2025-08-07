import type { CodeSpanProps } from '@/types';

export const CodeSpan = ({
  children,
  className = '',
  size = 'normal',
}: CodeSpanProps) => {
  const sizeClass = size === 'small' ? 'text-sm' : '';

  return (
    <code
      className={`rounded bg-zinc-800/80 px-2 py-1 font-mono text-yellow-500 ${sizeClass} ${className}`}
    >
      {children}
    </code>
  );
};
