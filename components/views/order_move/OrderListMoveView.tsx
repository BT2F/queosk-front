import AdditionalWaiting from '@/components/order_move/AdditionalWaiting';
import CookedList from '@/components/order_move/CookedList';
import OrderList from '@/components/order_move/OrderList';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Nav from '@/components/common/mystore/Nav';
import Header from '@/components/common/Header';

interface MenuItem {
  count: number;
  id: number;
  menu: {
    createdAt: string;
    updatedAt: string;
    id: number;
    restaurantId: number;
    name: string;
    imageUrl: string;
    price: number;
    status: string;
  };
}

export interface OrderType {
  id: number;
  menuItems: MenuItem[];
  orderStatus: string;
  tableId: number;
  userId: number;
}

export default function OrderListMoveView() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);

  const [cookedMenuList, setCookedMenuList] = useState<OrderType[]>([]);

  //주문 처리 완료 리스트 확인
  const getTodayDoneOrder = async () => {
    try {
      const response = await axios.get('/api/restaurant/orders/today-done');
      const data = response.data;
      setCookedMenuList(data);
    } catch (error) {
      console.error('주문 처리중 리스트 확인', error);
    }
  };

  useEffect(() => {
    getTodayDoneOrder();
  }, []);
  // useEffect(() => {
  //   getTodayDoneOrder();
  //   const intervalId = setInterval(() => {
  //     getTodayDoneOrder();
  //   }, 10000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <div className="flex">
      <Nav />

      <div className="mx-0 w-full" id="scrollCustom">
        <div className="w-6/7 h-screen mx-10 flex">
          <div className="w-2/3">
            <Header title="주문 처리중" isBack={false} />
            <OrderList />
          </div>
          <div className="w-1/3">
            <AdditionalWaiting />
            <Header title="주문 완료" isBack={false} />
            {/* <CookedList cookedMenuList={cookedMenuList} /> */}
          </div>
        </div>

        <style>
          {`
            #scrollCustom::-webkit-scrollbar {
                width: 4px;
                cursor: pointer;                   
            }
            #scrollCustom::-webkit-scrollbar-track {
                background-color: rgba(229, 231, 235, var(--bg-opacity));
                cursor: pointer;
            }
            #scrollCustom::-webkit-scrollbar-thumb {
                cursor: pointer;
                background-color: #a0aec0;
            }`}
        </style>
      </div>
    </div>
  );
}
