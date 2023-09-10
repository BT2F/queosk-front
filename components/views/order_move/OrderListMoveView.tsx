import AdditionalWaiting from '@/components/order_move/AdditionalWaiting';
import CookedList from '@/components/order_move/CookedList';
import OrderList from '@/components/order_move/OrderList';
import { useState } from 'react';
import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

interface TableInfo {
  tableId: number;
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
  orderId: number;
  table: TableInfo;
  menu: MenuInfo;
  orderStatus: 'IN_PROGRESS' | 'DONE' | 'CANCELED';
  count: number;
}

export default function OrderListMoveView() {
  const [cookedMenuList, setCookedMenuList] = useState<OrderDataType[]>([]);
  const [orderData, setOrderData] = useState<OrderDataType[]>([]);

  const [visibleStateIndex, setVisibleStateIndex] = useState<number[]>(
    orderData.map((data) => data.orderId)
  );
  //웨이팅 팀 수 및 팀 정보 확인
  const { data: waitingStatus } = useQuery({
    queryKey: ['waitingTeam'],
    queryFn: async () => await axios.get('/api/restaurants/queue'),
  });
  console.log(waitingStatus?.data);

  //주문 처리중 리스트 확인
  const { data: todayOrderData } = useQuery({
    queryKey: ['todayOrder'],
    queryFn: async () => await axios.get('/api/restaurant/orders/today'),
  });
  console.log(todayOrderData?.data);

  // useEffect(() => {
  //   refetchTodayOrder().then((data) => {
  //     setOrderData(data?.data);
  //     setVisibleStateIndex(
  //       data?.data.map((data: OrderDataType) => data.orderId) || []
  //     );
  //   });
  // }, [orderData, todayOrderData]);

  // //주문 처리 완료 리스트 확인
  // const { data: cookedOrderData, refetch: refetchCookedOrder } = useQuery({
  //   queryKey: ['cookedOrder'],
  //   queryFn: async () => {
  //     const response = await axios.get('/api/restaurant/orders/today');
  //     console.log(response.data);
  //     return response.data;
  //   },
  // });

  // useEffect(() => {
  //   refetchCookedOrder().then((data) => {
  //     setCookedMenuList(data?.data);
  //   });
  // }, [cookedMenuList, cookedOrderData]);

  //주문 상태 수정

  // const handleCookCompleteClick = (
  //   combinedData: {
  //     menu: MenuType[];
  //     tableId: number;
  //     currentTime: string;
  //   },
  //   deleteIndex: number
  // ) => {
  //   console.log(combinedData);

  //   const { menu, tableId, currentTime } = combinedData;

  //   const updatedMenuList = {
  //     tableId,
  //     cookTime: currentTime,
  //     menu,
  //   };

  //   setCookedMenuList((prevCookedMenuList) => [
  //     ...prevCookedMenuList,
  //     updatedMenuList,
  //   ]);

  //   setVisibleStateIndex((prevVisibleStateIndex) =>
  //     prevVisibleStateIndex.filter((i) => i !== deleteIndex)
  //   );
  // };
  return (
    <div className="w-full h-screen flex flex-row justify-center px-[10px] py-[10px] overflow-hidden">
      <div className="w-2/3 overflow-y-scroll" id="scrollCustom">
        {/* <OrderList
          visibleStateIndex={visibleStateIndex}
          data={orderData}
          //cookCompleteClick={handleCookCompleteClick}
        /> */}
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
        {/* <AdditionalWaiting />
        <CookedList cookedMenuList={cookedMenuList} /> */}
      </div>
    </div>
  );
}
