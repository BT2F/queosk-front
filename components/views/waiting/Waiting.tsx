import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

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
const formattedTime = `${getCurrentDate.hours}:${getCurrentDate.minutes}`;

export default function NowWaiting() {
  const router = useRouter();
  const [storeData, setStoreData] = useState(Object);
  const { storeId } = router.query;

  const handleQueueCancel = async () => {
    try {
      await axios.delete(`/api/restaurants/${storeId}/user/queue`);
      console.log(`웨이팅 취소 성공`);
      alert('웨이팅이 취소되었습니다.')
      router.push(`/store/`)
    } catch (error) {
      console.error(error);
    }
  };

  const getQueueData = async () => {
    const response = await axios.get(`/api/restaurants/${1}/user/queue/`);
    return response.data;
  };

  // const {
  //   data: queueData,
  //   error,
  //   refetch,
  // } = useQuery(['queueData'], () => getQueueData(), {
  //   refetchInterval: 10000,
  // });

  
  const { data: queueData, error } = useQuery({
    queryKey: ['queueData'],
    queryFn: getQueueData,
    refetchInterval: 10000,
  })
  
  if(error) {
    console.error('큐 로드 오류', error)
  }

  useEffect(() => {
    const getServerData = async () => {
      try {
        const response = await axios.get(`/api/restaurants/${storeId}/details`);
        const data = response.data;
        setStoreData(data.restaurantDto);
      } catch (error) {
        console.error('데이터 로드 오류', error);
      }
    };
    // const getQueueData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `/api/restaurants/${storeId}/user/queue/`
    //     );
    //     const resData = response.data;
    //     setQueueData(resData);
    //   } catch (error) {
    //     console.error('큐 로드 오류', error);
    //   }
    // }
    getServerData();
    // getQueueData();
  }, []);

  console.log(queueData);
  console.log(storeData);

  return (
    <>
      <div className="waiting-container md:max-w-[100%] max-w-[80%] mx-auto">
        <div className="navbar bg-base-100 mb-12">
          <Link href="/" className="text-xl normal-case ">
            Quosk
          </Link>
        </div>
        <div className="waiting-info-container border rounded-2xl mb-8">
          <div className="waiting-header py-4 border-b-2 border-gray-300">
            <h1 className="text-2xl text-center mb-2">대기 정보</h1>
            <h2 className="waiting-store-name text-xs text-gray-500 text-center mb-1">
              {storeData.restaurantName}
            </h2>
            <h3 className="waiting-time text-xs text-gray-400 text-center">
              {formattedDate} {formattedTime}
            </h3>
          </div>
          <div className="waiting-number py-24 relative after:content-[''] after:w-[80%] after:h-[2px] after:absolute after:bottom-0 after:left-2/4 after:translate-x-[-50%] after:borderafter:border-gray-300">
            <h2 className="text-2xl text-center">현재 대기 순위</h2>
            <h2 className="text-8xl font-bold text-center">
              {queueData ? (queueData.userQueueIndex) : ('...')}
            </h2>
          </div>
          {/* <div className="waiting-number-people pt-8 pb-24">
            <h2 className="text-2xl text-center mb-9">인원</h2>
            <h2 className="text-8xl font-bold text-center">{'4명'}</h2>
          </div> */}
        </div>
        <div className="waiting-btn flex flex-col">
          {/* <button
            className="btn mb-6"
            type="button"
            onClick={() => router.reload()}
          >
            실시간 웨이팅 확인
          </button> */}
          <button className="btn" type="button" onClick={handleQueueCancel}>
            웨이팅 취소 하기
          </button>
        </div>
      </div>
    </>
  );
}
