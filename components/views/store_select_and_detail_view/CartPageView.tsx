import MenuInCart from '@/components/store_select_and_detail/MenuInCart';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CartPageView() {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const router = useRouter();
  const { tableId } = router.query;
  return (
    <>
      <div>
        <div className="font-bold text-center text-3xl m-10 mb-1">
          나의 장바구니
        </div>
        <div className="text-end me-10 mb-5">
          테이블번호 : <span>{tableId}</span>
        </div>
        <div className="ms-20 me-20 mb-5 flex justify-between">
          <button className="btn btn-active bg-yellow-400"> ← 메뉴보기</button>
          <button className="btn btn-active btn-error">전체삭제</button>
        </div>

        <div className="h-112 overflow-y-auto">
          <MenuInCart menuName="고기" price={12000} imgSrc="고기" />
          <MenuInCart menuName="고기" price={12000} imgSrc="고기" />
          <MenuInCart menuName="고기" price={12000} imgSrc="고기" />
          <MenuInCart menuName="고기" price={12000} imgSrc="고기" />
          <MenuInCart menuName="고기" price={12000} imgSrc="고기" />
        </div>
        <div className="flex justify-evenly mt-5 mb-5">
          <div className="flex flex-col justify-center">
            <div>
              총 주문 아이템 : <span>1</span> 개
            </div>
            <div>
              총 주문 금액 : <span>50000</span> 원
            </div>
          </div>
          <button className="btn btn-lg bg-yellow-400 text-white text-bold">
            주문 및 결제하기
          </button>
        </div>
      </div>
    </>
  );
}
