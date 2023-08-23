import React, {
  Children,
  cloneElement,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import useId from '@/hooks/useId';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: ReactElement;
  errorText?: string;
}

export default function Input({
  label,
  children,
  errorText,
  className,
  ...props
}: InputProps) {
  const child = Children.only(children);
  const id = child.props.id || useId('input');
  const isError = !!child.props.error ?? true;

  return (
    <div
      {...props}
      className={`relative flex flex-col pb-6 gap-1 [&+&]:mt-2 ${className}`}
    >
      <label htmlFor={id}>{label}</label>
      {cloneElement(child, { ...child.props, id })}
      {isError && (
        <span className="absolute bottom-0 text-red-400">{errorText}</span>
      )}
    </div>
  );
}

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  error?: boolean;
  onEnter?: () => void;
}

Input.Field = forwardRef(
  (
    { error, onEnter = () => {}, ...props }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        className={`w-full px-4 py-[6px] bg-gray-700/10 border border-gray-700/20 rounded duration-300 ${
          error && 'border-red-500 bg-red-500/20'
        }`}
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onEnter();
          }
        }}
        {...props}
      />
    );
  },
);

Input.Select = forwardRef(
  (
    { error, onEnter = () => {}, ...props }: InputFieldProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <select
        className={`w-full px-4 py-[6px] bg-gray-700/10 border border-gray-700/20 rounded duration-300 ${
          error && 'border-red-500 bg-red-500/20'
        }`}
        ref={ref}
        {...props}
      />
    );
  },
);
