import useMenu from '@/hooks/useMenu';
import StoreMenuCard from '@/components/store_detail/StoreMenuCard';
import { IMenuRes } from '@/types/store.type';

interface Props {
  storeId: string;
  tableId: string;
}

export default function StoreMenuList(props: Props) {
  const { data } = useMenu(props.storeId);

  return (
    <div className="grid grid-cols-2 gap-10 p-3">
      {data.map((v: IMenuRes) => (
        <StoreMenuCard
          {...v}
          {...props}
          key={`store-${props.storeId}-menu-${v.name}`}
        />
      ))}
    </div>
  );
}
