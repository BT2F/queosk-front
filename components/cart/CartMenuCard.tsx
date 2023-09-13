import { IMenuRes } from '@/types/store.type';
import Image from 'next/image';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';
import { BiMinus, BiPlus, BiX } from 'react-icons/bi';
import useCart from '@/hooks/useCart';

interface Props extends IMenuRes {
  count: number;
}
export default function CartMenuCard(props: Props) {
  const { deleteItem, updateCount } = useCart();
  return (
    <div className="[&+&]:border-t py-2">
      <div className="flex justify-between items-center text-xl">
        <p>{props.name}</p>
        <div
          className="pl-5 hover:scale-125 duration-300"
          onClick={() => deleteItem(props.id)}
        >
          <BiX className="text-2xl" />
        </div>
      </div>
      <div className="flex">
        <figure className="w-[100px] h-[100px] rounded-xl overflow-hidden">
          <Image
            src={props.imageUrl || placeholderImgUrl('100x100')}
            alt={`${props.name} 이미지`}
            width={100}
            height={100}
          />
        </figure>
        <div className="flex flex-col flex-1 p-4">
          <p className="text-gray-700">
            가격 : {props.price.toLocaleString()}원
          </p>
          <p className="text-xl mt-2 font-semibold">
            {(props.count * props.price).toLocaleString()}원
          </p>
          <div className="flex items-center justify-end select-none">
            <div className="flex border rounded text-lg">
              <BiMinus
                className={`w-6 h-7 ${props.count === 1 && 'text-gray-300'}`}
                onClick={() =>
                  props.count > 1 && updateCount(props.id, props.count - 1)
                }
              />
              <p className="w-10 text-center">{props.count}</p>
              <BiPlus
                className="w-6 h-7"
                onClick={() => updateCount(props.id, props.count + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
