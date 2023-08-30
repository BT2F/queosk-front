import AddForm from '@/components/edit_menu/AddForm';
import { useState } from 'react';

interface FormData {
  menuImg: File;
  menuName: string;
  menuPrice: string;
  fileImage?: string;
  id?: number;
}

export default function EditMenuView() {
  const [menuList, setMenuList] = useState<FormData[]>([]);
  const [checkedMenu, setCheckedMenu] = useState<string[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const getInfo = (data: FormData) => {
    const newData = { ...data, id: nextId };
    setMenuList((prevMenuList) => [...prevMenuList, newData]);
    setNextId(nextId + 1);

    console.log(menuList);
    console.log(checkedMenu);
  };

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedMenu((prev) => [...prev, id.toString()]);
    } else {
      setCheckedMenu(checkedMenu.filter((el) => el !== id.toString()));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray = menuList.map((el) => el.id?.toString() as string);
      setCheckedMenu(idArray);
      console.log(idArray);
    } else {
      setCheckedMenu([]);
    }
  };

  const handleDelete = () => {
    const updatedMenuList = menuList.filter(
      (menu) => !checkedMenu.includes(menu.id?.toString() as string)
    );
    setMenuList(updatedMenuList);
    setCheckedMenu([]);
  };

  return (
    <div className="w-4/5 mx-auto my-0">
      <AddForm menuData={getInfo} />
      <div>
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl my-6">메뉴 목록</div>
          <button
            className="w-[80px] h-[33px] border-2 border-[#FBBD23] bg-[#FBBD23] rounded-2xl text-white"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
        <div>
          <div className="h-[40px] flex items-center text-center border-y-[2px] border-zinc-300 font-bold">
            <div className="px-5 py-auto">
              <input
                type="checkbox"
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={
                  menuList.length > 0 && checkedMenu.length === menuList.length
                }
                className="mx-auto"
              />
            </div>
            <div className="w-1/6">No.</div>
            <div className="w-3/6">메뉴명</div>
            <div className="w-2/6">가격</div>
            <div className="w-2/6">이미지</div>
            <div className="w-2/6">관리</div>
          </div>
          {menuList.map((data, index) => (
            <div key={index} className="flex items-center text-center my-2">
              <div className="px-5 py-auto">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleSingleCheck(e.target.checked, data.id as number)
                  }
                  checked={checkedMenu.includes(data.id?.toString() as string)}
                />
              </div>
              <div className="w-1/6">{index + 1}</div>
              <div className="w-3/6">{data.menuName}</div>
              <div className="w-2/6">{data.menuPrice} 원</div>
              {data.fileImage && (
                <div className="w-2/6">
                  <img
                    className="w-[40px] h-[40px] mx-auto"
                    src={data.fileImage}
                    alt="Menu"
                  />
                </div>
              )}
              <div className="w-2/6">
                <button className="w-[60px] border border-[#FBBD23] rounded-2xl py-1">
                  품절
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
