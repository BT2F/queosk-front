import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  linkOrButton: boolean;
  storeId?: string | string[];
  onClick?: () => void;
}

export default function WaitingTopHeader(props: HeaderProps) {
  return (
    <div className={`flex text-xl py-4 px-6 font-bold ${props.className}`}>
      {props.linkOrButton ? (
        <Link href={`/store/${props.storeId}`} className="mr-3">
          &#8592;
        </Link>
      ) : (
        <button className="mr-3" onClick={props.onClick}>
          &#8592;
        </button>
      )}

      <h1>{props.children}</h1>
    </div>
  );
}
