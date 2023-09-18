import { BsArrowLeftShort } from 'react-icons/bs';
import { HTMLAttributes } from 'react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

export default function WaitingTopHeader(props: HeaderProps) {
  return (
    <header className="flex font-bold text-xl py-2 [&>button]:w-12 [&>span]:w-12">
      <button type="button" onClick={props.onClick}>
        {<BsArrowLeftShort className="text-4xl" />}
      </button>
      <p className="flex flex-1 justify-center items-center">{props.children}</p>
      <span />
    </header>
  );
}
