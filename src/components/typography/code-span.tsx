import type { CodeSpanProps } from '@/types';

export const CodeSpan = ({
  children,
  className = '',
  size = 'normal',
}: CodeSpanProps) => {
  const sizeClass = size === 'small' ? 'text-[12px]' : 'text-[13px]';

  return (
    <code
      className={`rounded-md border border-zinc-700/50 bg-zinc-800/60 px-1.5 py-0.5 font-mono text-yellow-500 ${sizeClass} ${className}`}
    >
      {children}
    </code>
  );
};
