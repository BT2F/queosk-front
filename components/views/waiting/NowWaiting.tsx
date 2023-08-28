import Link from 'next/link';
import { useRouter } from 'next/router';

type ICurrentDate = {
  date?: object;
  year: number;
  month: string;
  day: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const date = new Date();

const getCurrentDate: ICurrentDate = {
  year: date.getFullYear(),
  month: ('0' + (date.getMonth() + 1)).slice(-2),
  day: ('0' + date.getDate()).slice(-2),
  hours: ('0' + date.getHours()).slice(-2),
  minutes: ('0' + date.getMinutes()).slice(-2),
  seconds: ('0' + date.getSeconds()).slice(-2),
};

const formattedDate = `${getCurrentDate.year}.${getCurrentDate.month}.${getCurrentDate.day}`;
const formattedTime = `${getCurrentDate.hours}:${getCurrentDate.minutes}:${getCurrentDate.seconds}`;

export default function NowWaiting() {
  const router = useRouter();

  return (
    <>
      <div className="waiting-container md:max-w-[51.5%] max-w-[80%] mx-auto">
        <div className="navbar bg-base-100 mb-12">
          <Link href="/" className="text-xl normal-case ">
            Quosk
          </Link>
        </div>
        <div className="waiting-info-container border rounded-2xl mb-8">
          <div className="waiting-header py-4 border-b-2 border-gray-300">
            <h1 className="text-2xl text-center mb-2">대기 정보</h1>
            <h2 className="waiting-store-name text-xs text-gray-500 text-center mb-1">
              {'매장명'}
            </h2>
            <h3 className="waiting-time text-xs text-gray-400 text-center">
              {formattedDate} {formattedTime}
            </h3>
          </div>
          <div className="waiting-number pt-24 pb-8 relative after:content-[''] after:w-[80%] after:h-[2px] after:absolute after:bottom-0 after:left-2/4 after:translate-x-[-50%] after:border after:border-gray-300">
            <h2 className="text-2xl text-center">현재 대기 순위</h2>
            <h2 className="text-8xl font-bold text-center">{'10'}</h2>
          </div>
          <div className="waiting-number-people pt-8 pb-24">
            <h2 className="text-2xl text-center mb-9">인원</h2>
            <h2 className="text-8xl font-bold text-center">{'4명'}</h2>
          </div>
        </div>
        <div className="waiting-btn flex flex-col">
          <button
            className="btn mb-6"
            type="button"
            onClick={() => router.reload()}
          >
            실시간 웨이팅 확인
          </button>
          <button className="btn" type="button">
            웨이팅 취소 하기
          </button>
        </div>
      </div>
    </>
  );
}
