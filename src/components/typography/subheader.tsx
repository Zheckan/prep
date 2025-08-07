import { slugify } from '@/helpers/slugify';
import type { SubheaderProps } from '@/types';

export const Subheader = ({ children, className = '', id }: SubheaderProps) => {
  const text = typeof children === 'string' ? children : '';
  const headerId = id || slugify(text);

  return (
    <h4
      className={`mb-2 font-extrabold text-lg text-zinc-100 uppercase tracking-wide ${className}`}
      id={headerId}
    >
      {children}
    </h4>
  );
};
