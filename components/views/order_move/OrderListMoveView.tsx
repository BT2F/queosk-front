import AdditionalWaiting from '@/components/order_move/AdditionalWaiting';
import CookedList from '@/components/order_move/CookedList';
import LayoutState from '@/components/order_move/LayoutState';
import OrderList from '@/components/order_move/OrderList';
import { useState } from 'react';

interface MenuType {
  menuName: string;
  quantity: number;
  tableNumber?: number;
  cookTime?: string;
}

interface OrderDataType {
  tableNumber: number;
  orderDateTime: string;
  menu: MenuType[];
}

interface CookedMenuList {
  menu: MenuType[];
  tableNumber: number;
  cookTime: string;
}

const Data: OrderDataType[] = [
  {
    tableNumber: 2,
    orderDateTime: '2023-08-15 12:30:00',
    menu: [
      {
        menuName: '햄버거',
        quantity: 2,
      },
      {
        menuName: '감자튀김',
        quantity: 3,
      },
    ],
  },
  {
    tableNumber: 3,
    orderDateTime: '2023-08-15 13:15:00',
    menu: [
      {
        menuName: '피자',
        quantity: 1,
      },
      {
        menuName: '샐러드',
        quantity: 2,
      },
    ],
  },
  {
    tableNumber: 5,
    orderDateTime: '2023-08-15 14:00:00',
    menu: [
      {
        menuName: '스테이크',
        quantity: 3,
      },
      {
        menuName: '마카로니',
        quantity: 1,
      },
    ],
  },
  {
    tableNumber: 1,
    orderDateTime: '2023-08-15 15:45:00',
    menu: [
      {
        menuName: '샐러드',
        quantity: 1,
      },
      {
        menuName: '음료수',
        quantity: 2,
      },
    ],
  },
  {
    tableNumber: 6,
    orderDateTime: '2023-08-15 16:30:00',
    menu: [
      {
        menuName: '스파게티',
        quantity: 2,
      },
      {
        menuName: '디저트',
        quantity: 1,
      },
    ],
  },
  {
    tableNumber: 4,
    orderDateTime: '2023-08-15 15:30:00',
    menu: [
      {
        menuName: '피자',
        quantity: 1,
      },
      {
        menuName: '디저트',
        quantity: 2,
      },
    ],
  },
  {
    tableNumber: 7,
    orderDateTime: '2023-08-15 17:30:00',
    menu: [
      {
        menuName: '샐러드',
        quantity: 2,
      },
      {
        menuName: '햄버거',
        quantity: 2,
      },
    ],
  },
];

export default function OrderListMoveView() {
  const [cookedMenuList, setCookedMenuList] = useState<CookedMenuList[]>([]);
  const [visibleStateIndex, setVisibleStateIndex] = useState<number[]>(
    Array.from({ length: Data.length }, (_, i) => i)
  );

  const handleCookCompleteClick = (
    combinedData: {
      menu: MenuType[];
      tableNumber: number;
      currentTime: string;
    },
    deleteIndex: number
  ) => {
    console.log(combinedData);

    const { menu, tableNumber, currentTime } = combinedData;

    const updatedMenuList = {
      tableNumber,
      cookTime: currentTime,
      menu,
    };

    setCookedMenuList((prevCookedMenuList) => [
      ...prevCookedMenuList,
      updatedMenuList,
    ]);

    setVisibleStateIndex((prevVisibleStateIndex) =>
      prevVisibleStateIndex.filter((i) => i !== deleteIndex)
    );
  };
  return (
    <div className="w-full h-[800px] border-black border-2 flex flex-row justify-center">
      <LayoutState className="w-2/3 h-auto overflow-auto">
        <OrderList
          visibleStateIndex={visibleStateIndex}
          data={Data}
          cookCompleteClick={handleCookCompleteClick}
        />
      </LayoutState>
      <div className="w-1/3">
        <AdditionalWaiting />
        <CookedList cookedMenuList={cookedMenuList} />
      </div>
    </div>
  );
}
