interface TextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted';
}

export const Text = ({
  children,
  className = '',
  variant = 'default',
}: TextProps) => {
  const variantClass = variant === 'muted' ? 'text-gray-50' : 'text-white';

  return <p className={`mb-3 ${variantClass} ${className}`}>{children}</p>;
};
