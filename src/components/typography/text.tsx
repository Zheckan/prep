import type { TextProps } from '@/types';

export const Text = ({
  children,
  className = '',
  variant = 'default',
}: TextProps) => {
  const variantClass = variant === 'muted' ? 'text-zinc-400' : 'text-zinc-200';

  return (
    <p
      className={`mb-3 text-[15px] leading-relaxed ${variantClass} ${className}`}
    >
      {children}
    </p>
  );
};
