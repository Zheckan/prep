import type { CodeSpanProps } from '@/types';

export const CodeSpan = ({
  children,
  className = '',
  size = 'normal',
}: CodeSpanProps) => {
  const sizeClass = size === 'small' ? 'text-sm' : '';

  return (
    <code
      className={`rounded-md bg-[var(--accent)]/10 px-1.5 py-0.5 font-mono text-[var(--accent)] ${sizeClass} ${className}`}
    >
      {children}
    </code>
  );
};
