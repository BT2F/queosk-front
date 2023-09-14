import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Logo from '@/public/asset/logo/queosk.png';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { AUTH_KEY } from '@/constants/auth';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const fixLocation = () => {
      if (getCookie(AUTH_KEY.ACCESS_TOKEN)) {
        router.replace('/store');
      } else {
        router.replace('/signin');
      }
    };
    setTimeout(() => fixLocation(), 1000);
  }, []);
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <figure className="w-[100px] h-[100px] rounded-xl overflow-hidden">
        <Image src={Logo} alt={'logoImage'} width={100} height={100} />
      </figure>
    </div>
  );
}
