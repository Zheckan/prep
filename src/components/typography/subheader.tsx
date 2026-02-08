import { slugify } from '@/helpers/slugify';
import type { SubheaderProps } from '@/types';

export const Subheader = ({ children, className = '', id }: SubheaderProps) => {
  const text = typeof children === 'string' ? children : '';
  const headerId = id || slugify(text);

  return (
    <h4
      className={`mb-2 font-bold text-[var(--foreground)] text-base uppercase tracking-wider ${className}`}
      id={headerId}
    >
      {children}
    </h4>
  );
};
