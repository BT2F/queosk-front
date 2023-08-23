interface ButtonProps {
  children: string;
  className?: string;
  onClick: () => void;
}

export default function WaitingButton({children, className, onClick}:ButtonProps) {
  return (
    <div className="pb-4 px-5 flex-col">
      <button
        className={`btn btn-warning text-white w-full ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
