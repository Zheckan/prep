import { slugify } from '@/helpers/slugify';
import type { HeaderProps } from '@/types';

export const Header = ({ children, className = '', id }: HeaderProps) => {
  const text = typeof children === 'string' ? children : '';
  const headerId = id || slugify(text);
  return (
    <h3
      className={`mb-3 font-bold text-xl underline decoration-2 decoration-yellow-500 underline-offset-4 ${className}`}
      id={headerId}
    >
      {children}
    </h3>
  );
};
