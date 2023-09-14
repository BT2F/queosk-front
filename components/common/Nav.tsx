import { MdOutlineManageAccounts } from 'react-icons/md';
import { LuClock } from 'react-icons/lu';
import Image from 'next/image';

import Logo from '@/public/asset/logo/queosk.png';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 h-16 max-w-[640px] px-6 mx-auto flex justify-between items-center bg-white border-t-2 
        [&>*]:w-24  [&>*]:flex  [&>*]:flex-col  [&>*]:justify-center  [&>*]:items-center 
      `}
    >
      <Link href={'/mywaiting'}>
        <figure>
          <LuClock className="w-7 h-7" />
        </figure>
        <p>웨이팅</p>
      </Link>
      <Link href={'/store'}>
        <figure className="rounded-xl overflow-hidden shadow">
          <Image src={Logo} alt={'로고 이미지'} width={50} height={50} />
        </figure>
      </Link>
      <Link href={'/account'}>
        <figure>
          <MdOutlineManageAccounts className="w-7 h-7" />
        </figure>
        계정
      </Link>
    </nav>
  );
}
