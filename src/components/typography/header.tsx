import { slugify } from '@/helpers/slugify';
import type { HeaderProps } from '@/types';

export const Header = ({ children, className = '', id }: HeaderProps) => {
  const text = typeof children === 'string' ? children : '';
  const headerId = id || slugify(text);
  return (
    <h3
      className={`mb-3 font-bold text-gradient text-lg sm:text-xl ${className}`}
      id={headerId}
    >
      {children}
    </h3>
  );
};
