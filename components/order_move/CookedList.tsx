import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { OrderType } from '../views/order_move/OrderListMoveView';

export default function CookedList() {
  const [todayDone, setTodayDone] = useState<OrderType[]>();

  const getTodayDoneOrder = async () => {
    try {
      const response = await axios.get('/api/restaurant/orders/today-done');
      const data = response.data;
      setTodayDone(data);
    } catch (error) {
      console.error('주문 처리중 리스트', error);
    }
  };

  useEffect(() => {
    getTodayDoneOrder();
  }, []);

  return (
    <div>
      {todayDone && todayDone.length > 0 ? (
        todayDone.map((data) => (
          <div key={data.id} className="mx-5 my-5">
            <table className="table card bg-base-100 shadow-xl">
              <thead>
                <tr>
                  <th className="w-4/5 font-semibold text-2xl text-orange-400">
                    {data.id}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      테이블 {data.tableId}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="mb-10">
                {data.menuItems.map((a) => {
                  return (
                    <tr className="w-full">
                      <td key={a.id}>
                        <span className="font-bold text-lg">{a.menu.name}</span>
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {a.menu.price.toLocaleString()}원
                        </span>
                      </td>
                      <td>x {a.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div>메뉴없음</div>
      )}
    </div>
  );
}
