interface buttonProps {
  children: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({ className, children, onClick }: buttonProps) {
  return (
    <div>
      <span
        className={className}
        style={{ textAlign: 'center', cursor: 'pointer', display: 'block' }}
        onClick={onClick}
      >
        {children}
      </span>
    </div>
  );
}
