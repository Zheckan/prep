interface SubheaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Subheader = ({ children, className = '' }: SubheaderProps) => {
  return (
    <h4
      className={`mb-2 font-extrabold text-lg uppercase tracking-wide ${className}`}
    >
      {children}
    </h4>
  );
};
