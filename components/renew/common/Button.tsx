import { Button as RdButton } from '@radix-ui/themes';
import { ButtonHTMLAttributes } from 'react';
import { IRadixColors } from '@/types/radix.type';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * 버튼의 크기
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 버튼의 컬러 타입
   */
  color?: IRadixColors;
};

const sizeMap = {
  lg: '4',
  md: '2',
  sm: '1',
} as const;

export default function Button({
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <RdButton
      size={sizeMap[size]}
      className={`duration-300  
        ${className} 
      `}
      {...props}
    />
  );
}
