import { HTMLAttributes } from 'react';

interface LayOutProps extends HTMLAttributes<HTMLDivElement> {}

export default function WatingLayOut(props: LayOutProps) {
  return (
    <div
      className={`num-of-visitor-container min-h-screen mx-auto relative ${props.className}`}
    >
      {props.children}
    </div>
  );
}
