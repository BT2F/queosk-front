import axios from '@/lib/axios';
import { useState, useEffect } from 'react';

export default function OrderCard() {
  const [todayOrder, setTodayOrder] = useState<number>();
  const [inProgressOrder, setInProgressOrder] = useState<number>();
  const [todayDoneOrder, setTodayDoneOrder] = useState<number>();
  const [waitingTeam, setWaitingTeam] = useState<number>();

  const getTodayOrder = async () => {
    try {
      const response = await axios.get('/api/restaurant/orders/today');
      const data = response.data;
      setTodayOrder(data.length);
    } catch (error) {
      console.error('금일 주문 리스트', error);
    }
  };

  const getInProgressOrder = async () => {
    try {
      const response = await axios.get('/api/restaurant/orders/in-progress');
      const data = response.data;
      setInProgressOrder(data.length);
    } catch (error) {
      console.error('금일 주문처리중 리스트', error);
    }
  };

  const getTodayDoneOrder = async () => {
    try {
      const response = await axios.get('/api/restaurant/orders/today-done');
      const data = response.data;
      setTodayDoneOrder(data.length);
    } catch (error) {
      console.error('금일 주문처리완료 리스트', error);
    }
  };

  const getWaitingTeam = async () => {
    try {
      const response = await axios.get('/api/restaurants/queue');
      const data = response.data;
      setWaitingTeam(data.totalQueue);
    } catch (error) {
      console.error('대기 팀', error);
    }
  };

  useEffect(() => {
    getTodayOrder();
    getInProgressOrder();
    getTodayDoneOrder();
    getWaitingTeam();
  }, []);

  return (
    <div className="card w-1/2 h-[200px] bg-base-100 shadow-xl flex flex-col mb-10 mx-0">
      <h1 className="text-xl font-bold absolute top-5 left-5">주문 현황</h1>
      <div className="w-full absolute top-20 flex justify-around items-center">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-3">{todayOrder}</h3>
          <p className="text-gray-400 font-semibold">전체</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-3">{inProgressOrder}</h3>
          <p className="text-gray-400 font-semibold">처리중</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-3">{todayDoneOrder}</h3>
          <p className="text-gray-400 font-semibold">완료</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-3">{waitingTeam}</h3>
          <p className="text-gray-400 font-semibold">대기팀</p>
        </div>
      </div>
    </div>
  );
}
