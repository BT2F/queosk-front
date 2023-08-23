interface LayoutStateProps {
  children: React.ReactNode;
  className: string;
}
export default function LayoutState({ children, className }: LayoutStateProps) {
  return (
    <div
      className={`border-black border-solid rounded-2xl border flex flex-col gap-1 py-1 m-3 ${className}`}
    >
      {children}
    </div>
  );
}
