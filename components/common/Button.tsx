import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'kakao' | 'primary';
  size?: 'lg' | 'md' | 'sm';
}

const colorMap = {
  kakao: 'bg-[#F6E04D] text-black',
  primary:
    'bg-emerald-700 border border-emerald-500 text-white hover:bg-emerald-600',
};
const sizeMap = {
  lg: 'text-lg py-2',
  md: 'text-base py-[6px]',
  sm: 'text-sm py-1',
};

export default function Button({
  color = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`w-full rounded [&+&]:mt-[20px] duration-300
        ${colorMap[color]}  
        ${sizeMap[size]} 
        ${className} 
      `}
      {...props}
    />
  );
}
