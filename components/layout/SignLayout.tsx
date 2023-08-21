import { HTMLAttributes } from 'react';

const SignLayout = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    className="absolute w-screen h-screen min-h-[500px] flex justify-center items-center"
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
  <div className="flex mt-9 justify-center items-center" {...props} />
);

export default SignLayout;
