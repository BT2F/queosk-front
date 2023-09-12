import AdditionalWaiting from '@/components/order_move/AdditionalWaiting';
import CookedList from '@/components/order_move/CookedList';
import OrderList from '@/components/order_move/OrderList';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

interface TableInfo {
  id: number;
  status?: 'USING' | 'OPEN';
}

interface MenuInfo {
  id?: number;
  restaurantId?: number;
  name: string;
  imageUrl?: string;
  price?: number;
  status?: 'SOLD_OUT' | 'ON_SALE';
}

interface OrderDataType {
  id: number;
  table: TableInfo;
  menu: MenuInfo;
  orderStatus: 'IN_PROGRESS' | 'DONE' | 'CANCELED';
  count: number;
}

export default function OrderListMoveView() {
  const [visibleStateIndex, setVisibleStateIndex] = useState<number[]>([]);
  const [orderData, setOrderData] = useState<OrderDataType[]>([]);

  const [cookedMenuList, setCookedMenuList] = useState<OrderDataType[]>([]);

  //주문 처리중 리스트 확인
  const getInProgressOrder = async () => {
    try {
      const response = await axios.get('/api/restaurant/orders/in-progress');
      const data = response.data;
      setOrderData(data);
      const newVisibleStateIndex = Array.from(
        { length: data.length },
        (_, i) => i
      );
      setVisibleStateIndex(newVisibleStateIndex);
    } catch (error) {
      console.error('주문 처리중 리스트 확인', error);
    }
  };
  useEffect(() => {
    getInProgressOrder();
    const intervalId = setInterval(() => {
      getInProgressOrder();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

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
    const intervalId = setInterval(() => {
      getTodayDoneOrder();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-row justify-center px-[10px] py-[10px] overflow-hidden">
      <div className="w-2/3 overflow-y-scroll" id="scrollCustom">
        <OrderList
          visibleStateIndex={visibleStateIndex}
          data={orderData}
          onRefresh={getInProgressOrder}
        />
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
      <div className="w-[250px] h-screen">
        <AdditionalWaiting />
        <CookedList cookedMenuList={cookedMenuList} />
      </div>
    </div>
  );
}
