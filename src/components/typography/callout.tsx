interface CalloutProps {
  children: React.ReactNode;
  className?: string;
}

export const Callout = ({ children, className = '' }: CalloutProps) => {
  return (
    <p
      className={`mb-3 bg-zinc-800/50 p-3 rounded border-l-4 border-white ${className}`}
    >
      {children}
    </p>
  );
};
