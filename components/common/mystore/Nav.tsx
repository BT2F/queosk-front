import logo from '@/public/asset/logo/queosk.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className="w-[250px] h-screen bg-orange-100">
      <Image
        src={logo}
        alt="로고"
        width={75}
        height={75}
        className="mt-7 mb-4 ml-5"
      />
      <nav>
        <ul className="menu w-[250px] rounded-box">
          <li className="py-[8px]">
            <Link href="/mystore" className="pl-[14px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[24px] w-[26px] mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              홈
            </Link>
          </li>
          <li className="py-[8px]">
            <Link href="/mystore/state" className="pl-[14px]">
              <img
                width="26"
                height="24"
                src="https://img.icons8.com/fluency-systems-regular/48/purchase-order--v1.png"
                alt="purchase-order--v1"
                className="mr-3"
              />
              주문
            </Link>
          </li>
          <li className="py-[8px]">
            <Link href="/mystore/tables">
              <img
                width="22"
                height="24"
                src="https://img.icons8.com/windows/32/table.png"
                alt="table"
                className="mr-3"
              />
              테이블
            </Link>
          </li>
          <li className="py-[8px]">
            <Link href="/mystore/menu/edit">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/ios/50/list--v1.png"
                alt="list--v1"
                className="mr-3"
              />
              메뉴
            </Link>
          </li>
          <li className="py-[8px]">
            <Link href="/mystore/settlement">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/windows/32/cash--v2.png"
                alt="cash--v2"
                className="mr-3"
              />
              정산
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
