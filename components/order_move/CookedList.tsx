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

interface CookedDataType {
  id: number;
  table: TableInfo;
  menu: MenuInfo;
  orderStatus: 'IN_PROGRESS' | 'DONE' | 'CANCELED';
  count: number;
}
interface CookedListProps {
  cookedMenuList: CookedDataType[];
}

export default function CookedList({ cookedMenuList }: CookedListProps) {
  return (
    <LayoutState className="w-auto h-[585px]">
      <div className="text-center border-b border-black border-solid py-2 font-bold">
        조리 완료 목록
      </div>
      <div className="overflow-y-scroll" id="scrollCustom">
        {cookedMenuList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center gap-3 h-[100px] border-b-2 border-zinc-200"
          >
            <div className="font-bold px-2">테이블 {item.table.id}</div>
            <div className="px-2 flex justify-between">
              <span>{item.menu.name}</span>
              <span>x {item.count}</span>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
            #scrollCustom::-webkit-scrollbar {
                width: 4px;
                cursor: pointer;                   
            }
            #scrollCustom::-webkit-scrollbar-track {
                background-color: rgba(229, 231, 235, var(--bg-opacity));
                cursor: pointer;
            }
            #scrollCustom::-webkit-scrollbar-thumb {
                cursor: pointer;
                background-color: #a0aec0;
            }`}
      </style>
    </LayoutState>
  );
}
