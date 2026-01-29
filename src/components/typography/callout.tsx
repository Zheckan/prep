import type { CalloutProps } from '@/types';

export const Callout = ({ children, className = '' }: CalloutProps) => {
  return (
    <div
      className={`mb-3 rounded-lg border border-yellow-500/20 border-l-2 border-l-yellow-500 bg-yellow-500/5 px-4 py-3 text-[14px] text-zinc-200 ${className}`}
    >
      {children}
    </div>
  );
};
