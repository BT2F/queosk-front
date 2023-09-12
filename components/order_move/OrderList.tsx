import StateCard from './StateCard';
import LayoutState from './LayoutState';

interface TableInfo {
  id: number;
  status?: 'USING' | 'OPEN';
}

interface MenuInfo {
  id?: number;
  restaurantId?: number;
  name: string;
  imageUrl?: string;
  price?: number;
  status?: 'SOLD_OUT' | 'ON_SALE';
}

interface OrderDataType {
  id: number;
  table: TableInfo;
  menu: MenuInfo;
  orderStatus: 'IN_PROGRESS' | 'DONE' | 'CANCELED';
  count: number;
}

interface OrderListProps {
  visibleStateIndex: number[];
  data: OrderDataType[];
  onRefresh: () => void;
}
export default function OrderList({
  visibleStateIndex,
  data,
  onRefresh,
}: OrderListProps) {
  if (!visibleStateIndex || visibleStateIndex.length === 0) {
    return <LayoutState className="w-auto h-screen" />;
  }
  console.log(data);
  return (
    <div>
      {visibleStateIndex.map((index) => (
        <StateCard
          key={index}
          orderId={data[index].id}
          tableId={data[index].table.id}
          name={data[index].menu.name}
          orderStatus={data[index].orderStatus}
          count={data[index].count}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}
