interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className = '' }: HeaderProps) => {
  return (
    <h3
      className={`mb-3 font-bold text-xl underline decoration-2 underline-offset-4 ${className}`}
    >
      {children}
    </h3>
  );
};
