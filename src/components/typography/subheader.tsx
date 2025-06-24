interface SubheaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Subheader = ({ children, className = '' }: SubheaderProps) => {
  return (
    <h4
      className={`text-lg font-extrabold mb-2 tracking-wide uppercase ${className}`}
    >
      {children}
    </h4>
  );
};
