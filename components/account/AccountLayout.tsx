import { HTMLAttributes } from 'react';

interface LayOutProps extends HTMLAttributes<HTMLDivElement> {}

export default function AccountLayOut(props: LayOutProps) {
  return (
    <div className={`min-h-screen mx-auto relative ${props.className}`}>
      {props.children}
    </div>
  );
}
