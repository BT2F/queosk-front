import LayoutState from './LayoutState';
import { useState } from 'react';
import axios from '@/lib/axios';

interface StateCardProps {
  orderId: number;
  tableId: number;
  name: string;
  orderStatus: 'IN_PROGRESS' | 'DONE' | 'CANCELED';
  count: number;
  onRefresh: () => void;
}

export default function StateCard({
  orderId,
  tableId,
  name,
  count,
  onRefresh,
}: StateCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  //주문 상태 수정
  const editStatusOrder = async (orderId: number, status: string) => {
    try {
      const response = await axios.put(
        `/api/restaurant/order/${orderId}?orderStatus=${status}`
      );
      const data = response.data;
      onRefresh();
    } catch (error) {
      console.error('주문상태수정', error);
    }
  };

  const handleCancelClick = (orderId: number) => {
    const updatedOrderStatus = 'CANCELED';
    console.log(orderId);
    editStatusOrder(orderId, updatedOrderStatus);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDoneClick = () => {
    const updatedOrderStatus = 'DONE';
    editStatusOrder(orderId, updatedOrderStatus);
    closeModal();
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
      <LayoutState className="w-auto">
        <div className="flex justify-between py-1">
          <span className="ml-2.5 flex items-center font-bold">
            주문 {orderId}
          </span>
          <span className="mr-2.5 flex items-center font-bold">
            테이블 {tableId}
          </span>
        </div>
        <div className="flex justify-between px-3 py-2 w-full border-t-2 border-zinc-200">
          <span>{name}</span>
          <span>x {count}</span>
        </div>
        <div className="ml-2.5 flex py-1 items-center justify-end font-bold">
          <button
            className="btn btn-outline btn-warning mr-2.5 border-2 border-[#FBBD23] bg-white rounded-2xl text-[#FBBD23] font-bold"
            onClick={openModal}
          >
            조리 완료
          </button>
          <button
            className="btn btn-outline btn-warning mr-2.5 border-2 border-[#FBBD23] bg-white rounded-2xl text-[#FBBD23] font-bold"
            onClick={() => handleCancelClick(orderId)}
          >
            주문 취소
          </button>
        </div>
      </LayoutState>
    </div>
  );
}
