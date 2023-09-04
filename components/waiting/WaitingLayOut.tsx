interface LayOutProps {
  className?: string;
  children : React.ReactNode;
}

export default function WatingLayOut ({className, children}:LayOutProps) {
  return (
    <div
      className={`num-of-visitor-container max-w-[80%] md:max-w-[640px] h-[100vh] mx-auto shadow-lg relative ${className}`}
    >
      {children}
    </div>
  );
}