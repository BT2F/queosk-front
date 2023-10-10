import axios from '@/lib/axios';
import { useState, useEffect } from 'react';

interface waitingTeam {
  totalQueue: number;
  queueDtoList: [];
}

export default function AdditionalWaiting() {
  const [waiting, setWaiting] = useState<waitingTeam>();

  const getWaitingTeam = async () => {
    try {
      const response = await axios.get('/api/restaurants/queue');
      const data = response.data;
      setWaiting(data);
    } catch (error) {
      console.error('매장 테이블 현황', error);
    }
  };

  useEffect(() => {
    getWaitingTeam();

    // const intervalId = setInterval(() => {
    //   getWaitingTeam();
    // }, 10000);

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);

  return (
    <div className="h-[250px] card bg-base-100 shadow-xl flex justify-center items-center mx-5 my-5">
      <div>추가 대기 현황</div>
      {waiting ? (
        <div className="text-7xl font-bold">{waiting.totalQueue}</div>
      ) : (
        <span className="loading loading-spinner loading-md"></span>
      )}
    </div>
  );
}
