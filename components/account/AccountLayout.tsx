import { HTMLAttributes } from 'react';

interface LayOutProps extends HTMLAttributes<HTMLDivElement> {}

export default function AccountLayOut(props: LayOutProps) {
  return (
    <div
      className={`max-w-[80%] md:max-w-[640px] h-[100vh] mx-auto shadow-lg relative ${props.className}`}
    >
      {props.children}
    </div>
  );
}