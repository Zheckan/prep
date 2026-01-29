import { slugify } from '@/helpers/slugify';
import type { HeaderProps } from '@/types';

export const Header = ({ children, className = '', id }: HeaderProps) => {
  const text = typeof children === 'string' ? children : '';
  const headerId = id || slugify(text);
  return (
    <h3
      className={`mb-3 font-semibold text-lg text-white ${className}`}
      id={headerId}
    >
      <span className='border-yellow-500/60 border-b pb-0.5'>{children}</span>
    </h3>
  );
};
