import type { CalloutProps } from '@/types';

export const Callout = ({ children, className = '' }: CalloutProps) => {
  return (
    <p
      className={`mb-3 rounded-md border-yellow-500 border-l-4 bg-zinc-800/60 p-3 text-zinc-100 ${className}`}
    >
      {children}
    </p>
  );
};
