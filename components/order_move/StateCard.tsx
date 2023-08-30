import LayoutState from './LayoutState';
import { useState, useEffect } from 'react';

interface MenuType {
  menuName: string;
  quantity: number;
}

interface StateCardProps {
  tableNumber: number;
  orderDateTime: string;
  menu: MenuType[];
  onCookCompleteClick: (combinedData: any) => void;
}

export default function StateCard({
  tableNumber,
  orderDateTime,
  menu,
  onCookCompleteClick,
}: StateCardProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formattedTime = now.toLocaleTimeString(undefined, options);
      setCurrentTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCookCompleteClick = () => {
    if (!confirm('조리 완료되었나요?')) {
    } else {
      const combinedData = { menu, tableNumber, currentTime };
      onCookCompleteClick(combinedData);
    }
  };

  return (
    <div>
      <LayoutState className="w-auto">
        <div className="flex justify-between py-1">
          <span className="ml-2.5 flex items-center font-bold">
            {tableNumber}번 테이블
          </span>
        </div>
        {menu.map((menuItem, index) => (
          <div
            key={index}
            className="flex justify-between px-3 py-1 w-full border-t-2 border-zinc-200"
          >
            <span>{menuItem.menuName}</span>
            <span>x {menuItem.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between py-1 items-center">
          <span className="ml-2.5">주문 일시 {orderDateTime}</span>
          <button
            className="mr-2.5 w-[105px] border-2 border-[#FBBD23] bg-white rounded-2xl text-[#FBBD23] font-bold py-1"
            onClick={handleCookCompleteClick}
          >
            조리 완료
          </button>
        </div>
      </LayoutState>
    </div>
  );
}
