import Button from './Button';
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
    <LayoutState className="w-auto">
      <div className="flex justify-between border-b border-black border-solid py-1">
        <span className="ml-2.5">{tableNumber}번 테이블</span>
        <span className="mr-2.5">주문 내역</span>
      </div>
      {menu.map((menuItem, index) => (
        <div key={index} className="flex justify-between bg-slate-100">
          <span>{menuItem.menuName}</span>
          <span>{menuItem.quantity}개</span>
        </div>
      ))}
      <div className="flex justify-between py-1">
        <span className="ml-2.5">주문 일시 {orderDateTime}</span>
        <Button
          className="mr-2.5 w-90 bg-black text-white px-2"
          onClick={handleCookCompleteClick}
        >
          조리 완료
        </Button>
      </div>
    </LayoutState>
  );
}
