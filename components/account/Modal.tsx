import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

export default function Modal({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`modal-container flex justify-center items-center h-full ${className}`}
      {...props}
    />
  );
}

Modal.BackGround = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    className="modal-bg z-[99] fixed justify-center items-center bg-gray-400/50 top-0 left-0 right-0 bottom-0 flex"
    {...props}
  />
);

Modal.Body = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="card w-[90%] max-w-lg shadow-md bg-white">
    <div className="card-body p-6">{props.children}</div>
  </div>
);

Modal.Header = (props: HTMLAttributes<HTMLHeadElement>) => (
  <h1 className="text-xl font-bold mb-4" {...props}></h1>
);

Modal.Form = (props: HTMLAttributes<HTMLFormElement>) => (
  <form {...props}></form>
);

Modal.ProfileInfoContainer = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="profile-info mb-10" {...props} />
);

interface ProfileImage extends HTMLAttributes<HTMLImageElement> {
  alt?: string;
  src?: string;
  children?: ReactNode;
}

interface ProfileInput extends InputHTMLAttributes<HTMLInputElement> {}

Modal.ProfileImg = ({ alt, src, children, ...props }: ProfileImage) => (
  <div className="profile-picture flex justify-center">
    <div className="w-24 h-24 border rounded-full flex justify-center items-center overflow-hidden">
      <label htmlFor="image-upload-input">
        <img
          className="w-24 h-24 cursor-pointer object-cover"
          alt={alt}
          src={src}
          {...props}
        />
      </label>
    </div>
    {children}
  </div>
);

Modal.ProfileInput = (props: ProfileInput) => (
  <input
    type="file"
    accept="image/*"
    id="image-upload-input"
    className="hidden"
    {...props}
  />
);

interface ProfileTextProps extends InputHTMLAttributes<HTMLInputElement> {
  textHeader?: string;
  validation?: boolean | null;
  isValue?: string;
}

Modal.ProfileText = ({
  textHeader,
  validation,
  isValue,
  ...props
}: ProfileTextProps) => (
  <div className="profile-text text-left my-4">
    <div className="">
      {textHeader ? (
        <div className="mb-1 font-bold text-xs">{textHeader}</div>
      ) : null}
      <input className="w-full p-3 bg-gray-100 rounded-lg" {...props} />
      {isValue ? (
        validation ? (
          null
        ) : (
          <p className="text-red-400 text-xs mt-2">
            영문, 한글, 숫자를 사용하여 3~16자까지 입력하세요.
          </p>
        )
      ) : null}
    </div>
  </div>
);

interface ProfilePasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  textHeader?: string;
  validation?: boolean | null;
  value?: string;
  passwordStr?: string;
  passwordCheck?: string;
}

Modal.ProfilePassword = ({
  textHeader,
  validation,
  value,
  passwordStr,
  passwordCheck,
  ...props
}: ProfilePasswordProps) => (
  <div className="profile-text text-left my-4">
    <div className="">
      {textHeader ? (
        <div className="mb-1 font-bold text-xs">{textHeader}</div>
      ) : null}
      <input className="w-full p-3 bg-gray-100 rounded-lg" {...props} />
      {value ? (
        validation ? (
          null
        ) : (
          <p className="text-red-400 text-xs mt-2">{passwordCheck}</p>
        )
      ) : null}
    </div>
  </div>
);

Modal.Btn = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`btn bg-orange-200 hover:bg-orange-300 text-xs w-20 disabled:bg-gray-100 disabled:border-gray-200 ${props.className}`}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);
