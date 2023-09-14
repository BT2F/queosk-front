import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Logo from '@/public/asset/logo/queosk.png';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { AUTH_KEY } from '@/constants/auth';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ scale: 180 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 50,
        }}
      >
        <figure className="w-[100px] h-[100px] rounded-xl overflow-hidden">
          <Image src={Logo} alt={'logoImage'} width={100} height={100} />
        </figure>
      </motion.div>
    </div>
  );
}
