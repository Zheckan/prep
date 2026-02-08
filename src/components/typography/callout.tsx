import type { CalloutProps } from '@/types';

export const Callout = ({ children, className = '' }: CalloutProps) => {
  return (
    <p
      className={`mb-3 rounded-lg border-[var(--accent)] border-l-4 bg-[var(--accent)]/5 p-4 text-[var(--foreground)] ${className}`}
    >
      {children}
    </p>
  );
};
