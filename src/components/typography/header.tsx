interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className = '' }: HeaderProps) => {
  return (
    <h3
      className={`text-xl font-bold mb-3 underline decoration-2 underline-offset-4 ${className}`}
    >
      {children}
    </h3>
  );
};
