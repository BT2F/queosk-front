import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { OrderType } from '../views/order_move/OrderListMoveView';

export default function OrderList() {
  const [inProgress, setInProgress] = useState<OrderType[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const getInProgressOrder = async () => {
    try {
      const response = await axios.get('/api/restaurant/orders/in-progress');
      const data = response.data;
      setInProgress(data);
    } catch (error) {
      console.error('주문 처리중 리스트', error);
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

  const editStatusOrder = async (orderId: number, status: string) => {
    try {
      await axios.put(`/api/restaurant/order/${orderId}?orderStatus=${status}`);
      getInProgressOrder();
    } catch (error) {
      console.error('주문상태수정', error);
    }
  };

  const handleCancelClick = (orderId: number) => {
    editStatusOrder(orderId, 'CANCELED');
  };

  const handleDoneClick = () => {
    editStatusOrder(orderId as number, 'DONE');
    closeModal();
  };

  const openModal = (orderId: number) => {
    setOrderId(orderId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen && (
        <div className="fixed top-3 inset-x-0 flex items-center justify-center z-50">
          <div className="alert w-[500px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>조리 완료되었나요?</span>
            <div>
              <button className="btn btn-sm bg-white mr-2" onClick={closeModal}>
                아니요
              </button>
              <button
                className="btn btn-sm btn-warning"
                onClick={handleDoneClick}
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
      {inProgress && inProgress.length > 0 ? (
        inProgress.map((data) => (
          <div className="flex flex-col" key={data.id}>
            <div className=" my-5">
              <table className="table card bg-base-100 shadow-xl">
                <thead>
                  <tr>
                    <th className="w-1/5 font-semibold text-2xl text-orange-400">
                      {data.id}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        테이블 {data.tableId}
                      </span>
                    </th>
                    <th className="w-3/5">메뉴</th>
                    <th className="w-1/5">
                      <div>
                        <button
                          className="btn btn-sm btn-outline btn-warning mr-3"
                          onClick={() => openModal(data.id)}
                        >
                          조리 완료
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-warning"
                          onClick={() => handleCancelClick(data.id)}
                        >
                          주문 취소
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="mb-10">
                  {data.menuItems.map((a) => {
                    return (
                      <tr className="w-full" key={a.id}>
                        <td></td>
                        <td>
                          <span className="font-bold text-lg">
                            {a.menu.name}
                          </span>
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
          </div>
        ))
      ) : (
        <div>메뉴없음</div>
      )}
    </div>
  );
}
