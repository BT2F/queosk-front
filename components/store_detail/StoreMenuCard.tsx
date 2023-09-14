import { IMenuRes } from '@/types/store.type';
import Image from 'next/image';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';
import useCart from '@/hooks/useCart';

interface Props extends IMenuRes {
  storeId: string;
  tableId: string;
}
export default function StoreMenuCard(props: Props) {
  const { cart, add, init, clear } = useCart();

  const onClick = () => {
    if (!cart.storeId) {
      init(props.storeId, props.tableId);
    } else if (cart.storeId !== props.restaurantId.toString()) {
      const state = confirm('기존 장바구니는 제거됩니다!');
      state && init(props.storeId, props.tableId);
    }
    add(props);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-xl" onClick={onClick}>
      <div className="relative w-full h-40">
        <Image
          src={props.imageUrl || placeholderImgUrl('100x100')}
          alt={`${props.name} 이미지`}
          fill={true}
          objectFit={'cover'}
        />
      </div>
      <div className="flex flex-col items-center p-3">
        <h3 className="text-xl">{props.name}</h3>
        <p className="text-md">{props.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
