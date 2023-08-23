import { HTMLAttributes } from 'react';

const SignLayout = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`absolute top-0 left-0 w-screen h-screen px-2 min-h-[530px] flex justify-center items-center overflow-y-auto ${className}`}
    {...props}
  />
);

SignLayout.Form = (props: HTMLAttributes<HTMLFormElement>) => (
  <form className="w-[384px]" {...props} />
);

SignLayout.Divider = () => (
  <span className="divider !gap-2 text-gray-500">or</span>
);

SignLayout.Title = (props: HTMLAttributes<HTMLHeadElement>) => (
  <h2 className="text-5xl font-bold" {...props} />
);

SignLayout.SubTitle = (props: HTMLAttributes<HTMLParagraphElement>) => (
  <p className="mt-2 text-gray-600 mb-10" {...props} />
);

SignLayout.InputContainer = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="mb-6" {...props} />
);

SignLayout.LinkContainer = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    className="flex mt-9 justify-center items-center duration-100 hover:scale-105"
    {...props}
  />
);

export default SignLayout;
