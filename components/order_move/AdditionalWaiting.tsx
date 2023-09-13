import LayoutState from './LayoutState';
import axios from '@/lib/axios';
import { useState, useEffect } from 'react';

interface waitingTeam {
  totalQueue: number;
  queueDtoList: [];
}

export default function AdditionalWaiting() {
  const [waiting, setWaiting] = useState<waitingTeam>();

  // 웨이팅 팀 수 및 팀 정보 확인
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

    const intervalId = setInterval(() => {
      getWaitingTeam();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <LayoutState className="w-auto h-[200px] flex justify-center items-center gap-2">
      <div>추가 대기 현황</div>
      {waiting ? (
        <div className="text-7xl font-bold">{waiting.totalQueue}</div>
      ) : (
        <span className="loading loading-spinner loading-md"></span>
      )}
    </LayoutState>
  );
}
