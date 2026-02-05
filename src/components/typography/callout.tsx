import type { CalloutProps } from '@/types';

export const Callout = ({ children, className = '' }: CalloutProps) => {
  return (
    <p
      className={`mb-3 rounded-lg border-[var(--accent)] border-l-4 bg-[var(--surface-1)] p-4 text-[var(--muted-foreground)] ${className}`}
    >
      {children}
    </p>
  );
};
