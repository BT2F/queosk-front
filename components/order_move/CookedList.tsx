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
      <div className="text-center border-b border-black border-solid py-1">
        조리 완료 목록
      </div>
      <div className="overflow-auto">
        {cookedMenuList.map((order, index) => (
          <div
            key={index}
            className="[&:not(:last-child)]:border-b border-black border-solid py-2 flex flex-col gap-1 "
          >
            <div> {order.tableNumber}번 테이블</div>
            <div>조리 완료 : {order.cookTime}</div>
            {order.menu.map((menuItem, itemIndex) => (
              <div
                key={itemIndex}
                className="flex justify-between bg-slate-100"
              >
                <span>{menuItem.menuName}</span>
                <span>{menuItem.quantity}개</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </LayoutState>
  );
}
