import Link from "next/link";

interface HeaderProps {
  className?: string;
  children: string;
  linkOrButton: boolean;
  onClick?: () => void;
  storeId?: string | string[];
}

export default function WaitingTopHeader ({className, children, onClick, linkOrButton, storeId}:HeaderProps) {
  return (
    <div className={`flex text-2xl py-4 px-6 font-bold ${className}`}>
      {linkOrButton ? (
        <Link href={`/store/${storeId}`} className="mr-3">
          &#8592;
        </Link>
      ) : (
        <button className="mr-3" onClick={onClick}>&#8592;</button>
      )}

      <h1>{children}</h1>
    </div>
  );
}