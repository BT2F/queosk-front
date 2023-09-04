import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
}

export default function WaitingButton(props:ButtonProps) {
  return (
    <div className="pb-4 px-5 flex-col">
      <button
        className={`btn btn-warning text-white w-full ${props.className}`} onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
}
