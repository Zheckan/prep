import type { TextProps } from '@/types';

export const Text = ({
  children,
  className = '',
  variant = 'default',
}: TextProps) => {
  const variantClass = variant === 'muted' ? 'text-zinc-300' : 'text-white';

  return <p className={`mb-3 ${variantClass} ${className}`}>{children}</p>;
};
