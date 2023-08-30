import LayoutState from './LayoutState';

interface MenuType {
  menuName: string;
  quantity: number;
  tableNumber?: number;
  cookTime?: string;
}

interface CookedMenuList {
  menu: MenuType[];
  tableNumber: number;
  cookTime: string;
}

interface CookedListProps {
  cookedMenuList: CookedMenuList[];
}

export default function CookedList({ cookedMenuList }: CookedListProps) {
  return (
    <LayoutState className="w-auto h-[560px]">
      <div className="text-center border-b border-black border-solid py-2 font-bold">
        조리 완료 목록
      </div>
      <div className="overflow-auto">
        {cookedMenuList.map((order, index) => (
          <div
            key={index}
            className="[&:not(:last-child)]:border-b border-black border-solid py-2 flex flex-col gap-1 "
          >
            <div className="font-bold px-2"> {order.tableNumber}번 테이블</div>

            {order.menu.map((menuItem, itemIndex) => (
              <div
                key={itemIndex}
                className="flex justify-between px-3 py-1 border-t-2 border-zinc-200"
              >
                <span>{menuItem.menuName}</span>
                <span>x {menuItem.quantity}</span>
              </div>
            ))}
            <div className="px-2 py-1">조리 완료 {order.cookTime}</div>
          </div>
        ))}
      </div>
    </LayoutState>
  );
}
