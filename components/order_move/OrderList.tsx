import StateCard from './StateCard';

interface MenuType {
  menuName: string;
  quantity: number;
  tableNumber?: number;
  cookTime?: string;
}

interface OrderDataType {
  tableNumber: number;
  orderDateTime: string;
  menu: MenuType[];
}

interface OrderListProps {
  visibleStateIndex: number[];
  data: OrderDataType[];
  cookCompleteClick: (
    combinedData: {
      menu: MenuType[];
      tableNumber: number;
      currentTime: string;
    },
    deleteIndex: number
  ) => void;
}
export default function OrderList(props: OrderListProps) {
  return (
    <div>
      {props.visibleStateIndex.map((index) => (
        <StateCard
          key={index}
          tableNumber={props.data[index].tableNumber}
          orderDateTime={props.data[index].orderDateTime}
          menu={props.data[index].menu}
          onCookCompleteClick={(combinedData) =>
            props.cookCompleteClick(combinedData, index)
          }
        />
      ))}
    </div>
  );
}
