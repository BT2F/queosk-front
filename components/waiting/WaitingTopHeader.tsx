import Link from "next/link";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";

interface HeaderProps extends HTMLAttributes<HTMLDivElement>{
  linkOrButton: boolean
  storeId?: string | string[];
  onClick?: () => void;
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function WaitingTopHeader (props:HeaderProps) {
  return (
    <div className={`flex text-2xl py-4 px-6 font-bold ${props.className}`}>
      {props.linkOrButton ? (
        <Link href={`/store/${props.storeId}`} className="mr-3">
          &#8592;
        </Link>
      ) : (
        <button className="mr-3" onClick={props.onClick}>&#8592;</button>
      )}

      <h1>{props.children}</h1>
    </div>
  );
}