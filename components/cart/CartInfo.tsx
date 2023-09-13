import useStoreDetail from '@/hooks/useStoreDetail';
import CartHeader from '@/components/cart/CartHeader';
import CartMenuList from '@/components/cart/CartMenuList';
import Link from 'next/link';
import useCart from '@/hooks/useCart';
import { BiPlus } from 'react-icons/bi';

interface Props {
  storeId: string;
  totalPrice: number;
}
export default function CartInfo(props: Props) {
  const { data } = useStoreDetail(props.storeId);
  const { cart } = useCart();

  return (
    <div>
      {data && (
        <>
          <CartHeader {...data} />
          <CartMenuList />
          <Link
            href={`/store/${cart.storeId}/table/${cart.tableId}/menu`}
            className="flex items-center justify-center text-lg border-t py-2"
          >
            <BiPlus className="text-2xl" />
            <p>더 담으러 가기</p>
          </Link>
          <div className="flex items-center justify-between border-t-4 py-4 px-2 text-lg">
            <p>총 주문 금액</p>
            <b>{props.totalPrice.toLocaleString()}원</b>
          </div>
        </>
      )}
    </div>
  );
}
