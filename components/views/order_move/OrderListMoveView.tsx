import AdditionalWaiting from '@/components/order_move/AdditionalWaiting';
import CookedList from '@/components/order_move/CookedList';
import OrderList from '@/components/order_move/OrderList';
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
  return (
    <div className="flex">
      <Nav />
      <div className="mx-0 w-full">
        <div className="w-6/7 h-screen mx-10 flex">
          <div className="w-2/3">
            <Header title="주문 처리중" isBack={false} />
            <OrderList />
          </div>
          <div className="w-1/3">
            <AdditionalWaiting />
            <Header title="주문 완료" isBack={false} />
            <CookedList />
          </div>
        </div>
      </div>
    </div>
  );
}
