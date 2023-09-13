import { HTMLAttributes } from 'react';
import { useRouter } from 'next/router';
import BackButton from '@/components/common/BackButton';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export default function AccountHeader(props: HeaderProps) {
  const router = useRouter();
  return (
    <div
      className={`flex items-center text-xl py-4 px-5 font-bold ${props.className}`}
    >
      <BackButton />
      <h1>{props.children}</h1>
    </div>
  );
}
