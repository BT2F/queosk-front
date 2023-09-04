import { HTMLAttributes } from 'react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export default function AccountHeader(props: HeaderProps) {
  return (
    <div
      className={`flex text-xl py-4 px-5 font-bold ${props.className}`}
    >
      <h1>{props.children}</h1>
    </div>
  );
}
