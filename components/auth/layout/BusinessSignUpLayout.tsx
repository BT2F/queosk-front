import { HTMLAttributes } from 'react';

const BusinessSignUpLayout = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="absolute w-screen top-0 left-0 my-10 p-10" {...props} />
);
BusinessSignUpLayout.Form = (props: HTMLAttributes<HTMLFormElement>) => (
  <form className="relative max-w-[1050px] mx-auto" {...props} />
);
BusinessSignUpLayout.Grid = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="grid grid-cols-2 gap-x-10" {...props} />
);
BusinessSignUpLayout.Divider = () => (
  <span className="divider !gap-2 text-gray-500">or</span>
);

BusinessSignUpLayout.Title = (props: HTMLAttributes<HTMLHeadElement>) => (
  <h2 className="text-5xl font-bold" {...props} />
);

BusinessSignUpLayout.SubTitle = (
  props: HTMLAttributes<HTMLParagraphElement>,
) => <p className="mt-2 text-gray-600 mb-10" {...props} />;

BusinessSignUpLayout.LinkContainer = (
  props: HTMLAttributes<HTMLDivElement>,
) => (
  <div
    className="flex mt-9 justify-center items-center duration-100 hover:scale-105"
    {...props}
  />
);
export default BusinessSignUpLayout;
