import useCart from '@/hooks/useCart';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { BiArrowBack, BiHomeAlt2 } from 'react-icons/bi';
import { useRouter } from 'next/router';
import axios from '@/lib/axios';

const CartInfo = dynamic(() => import('@/components/cart/CartInfo'), {
  ssr: false,
});
export default function CartView() {
  const { cart } = useCart();
  const router = useRouter();
  const totalPrice = cart.menuList.reduce(
    (acc, cur) => acc + cur.price * cur.count,
    0,
  );
  const totalCount = cart.menuList.reduce((acc, cur) => (acc += cur.count), 0);

  const onClick = async () => {
    const data = {
      taxFreeAmount: 0,
      vatAmount: 0,
      greenDeposit: 0,
      installMonth: 0,
      itemName: '전체',
      itemCode: `${cart.storeId}-${cart.tableId}`,
      quantity: totalCount,
      totalAmount: totalPrice,
    };
    await axios
      .post('/api/payment/ready', data)
      .then((res) => router.replace(res.data.nextRedirectMobileUrl || ''));
  };

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 w-full flex items-center justify-between bg-white text-xl font-bold py-2 border-b-2">
        <BiArrowBack className="text-2xl" onClick={() => router.back()} />
        <h2>장바구니</h2>
        <BiHomeAlt2
          className="text-2xl"
          onClick={() => router.push('/store')}
        />
      </header>
      <div className="mb-16">
        <Suspense>
          <CartInfo {...cart} totalPrice={totalPrice} />
        </Suspense>
      </div>
      <div className="fixed bottom-0 left-0 right-0 pb-2 flex justify-center items-center bg-white border-t-2 h-16 mx-auto max-w-[640px]">
        <button
          type="button"
          className="btn btn-xl bg-yellow-400 hover:bg-yellow-300 duration-300 w-52 text-xl"
          onClick={onClick}
        >
          결제 하기
        </button>
      </div>
    </div>
  );
}
