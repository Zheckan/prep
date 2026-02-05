import type { CodeSpanProps } from '@/types';

export const CodeSpan = ({
  children,
  className = '',
  size = 'normal',
}: CodeSpanProps) => {
  const sizeClass = size === 'small' ? 'text-sm' : '';

  return (
    <code
      className={`rounded-md bg-[var(--surface-1)] px-2 py-1 font-mono text-[var(--accent-light)] ${sizeClass} ${className}`}
    >
      {children}
    </code>
  );
};
