import LayoutState from '@/components/LayoutState';
import StateCard from '@/components/StateCard';
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

const ADDITIONAL_WAITING = 20;

export default function Page() {
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

    // console.log(deleteIndex);
    // console.log(menu);

    setVisibleStateIndex((prevVisibleStateIndex) =>
      prevVisibleStateIndex.filter((i) => i !== deleteIndex)
    );
  };
  console.log(cookedMenuList);
  console.log(visibleStateIndex);

  return (
    <div className="w-full border-black border-2 flex flex-row justify-center ">
      <div className="w-2/3 overflow-auto">
        {visibleStateIndex.map((index) => (
          <StateCard
            key={index}
            tableNumber={Data[index].tableNumber}
            orderDateTime={Data[index].orderDateTime}
            menu={Data[index].menu}
            onCookCompleteClick={(combinedData) =>
              handleCookCompleteClick(combinedData, index)
            }
          />
        ))}
      </div>
      <div className="w-1/3">
        <LayoutState className="w-auto h-[200px] flex justify-center items-center gap-2">
          <div>추가 대기 현황</div>
          <div className="text-7xl font-bold">{ADDITIONAL_WAITING}</div>
        </LayoutState>
        <LayoutState className="w-auto h-[500px]">
          <div className="text-center border-b border-black border-solid py-1">
            조리 완료 목록
          </div>
          <div className="overflow-auto">
            {cookedMenuList.map((order, index) => (
              <div
                key={index}
                className="[&:not(:last-child)]:border-b border-black border-solid py-2 flex flex-col gap-1 "
              >
                <div> {order.tableNumber}번 테이블</div>
                <div>조리 완료 : {order.cookTime}</div>
                {order.menu.map((menuItem, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-between bg-slate-100"
                  >
                    <span>{menuItem.menuName}</span>
                    <span>{menuItem.quantity}개</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </LayoutState>
      </div>
    </div>
  );
}
