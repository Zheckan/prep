interface CalloutProps {
  children: React.ReactNode;
  className?: string;
}

export const Callout = ({ children, className = '' }: CalloutProps) => {
  return (
    <p
      className={`mb-3 rounded border-[var(--accent)] border-l-4 bg-zinc-900 p-3 text-zinc-100 ${className}`}
    >
      {children}
    </p>
  );
};
