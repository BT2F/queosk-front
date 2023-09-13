import { IStoreRes } from '@/types/store.type';

interface Props extends IStoreRes {}
export default function CartHeader(props: IStoreRes) {
  return (
    <div className="flex text-xl border-b p-2 border-t-8">
      <h2>{props.restaurantName}</h2>
    </div>
  );
}
