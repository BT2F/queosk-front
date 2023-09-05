import AddForm from '@/components/edit_menu/AddForm';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

interface FormData {
  name: string;
  price: number;
  imageUrl?: string;
  id?: number;
  status?: string;
}
interface NewDataType {
  name: string;
  price: number;
  imageUrl?: string;
}
export default function EditMenuView() {
  const [checkedMenu, setCheckedMenu] = useState<string[]>([]);
  const [menuData, setMenuData] = useState<FormData[]>([]);
  const [newMenuData, setNewMenuData] = useState<NewDataType | undefined>();
  const [nextId, setNextId] = useState<number>(1);

  //식당 메뉴 목록 조회
  const { data: menuListData, refetch: refetchMenuList } = useQuery<any, any>({
    queryKey: ['menuList'],
    queryFn: async () => {
      const response = await axios.get('/api/restaurant/:id/menus');
      return response.data;
    },
  });

  useEffect(() => {
    refetchMenuList().then((data) => {
      setMenuData(data?.data);
    });
  }, [newMenuData, menuListData]);

  //식당 메뉴 목록 추가
  const addNewMenuMutation = useMutation(
    async (newMenuData: NewDataType) => {
      const response = await axios.post('/api/restaurant/menus', newMenuData);
      return response.data;
    },
    {
      onSuccess: () => {
        refetchMenuList();
      },
    }
  );

  useEffect(() => {
    if (newMenuData) {
      addNewMenuMutation.mutate(newMenuData);
    }
  }, [newMenuData]);

  const getInfo = (data: FormData) => {
    const { name, imageUrl, price } = data;
    const newData = { imageUrl, name, price };
    setNewMenuData(newData);
    setNextId(nextId + 1);
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
      const idArray = menuData.map((el: any) => el.id?.toString() as string);
      setCheckedMenu(idArray);
      console.log(idArray);
    } else {
      setCheckedMenu([]);
    }
  };

  const handleDelete = () => {
    const updatedMenuList = menuData.filter(
      (menu) => !checkedMenu.includes(menu.id?.toString() as string)
    );
    setMenuData(updatedMenuList);
    setCheckedMenu([]);
  };

  return (
    <div className="w-4/5 mx-auto my-0">
      <AddForm menuData={getInfo} />
      <div>
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl my-6">메뉴 목록</div>
          <button
            className="btn w-[80px] h-[33px] border-2 border-[#FBBD23] bg-[#FBBD23] rounded-2xl text-white"
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
                  menuData.length > 0 && checkedMenu.length === menuData.length
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
          {menuData ? (
            menuData.map((data, index) => (
              <div key={index} className="flex items-center text-center my-2">
                <div className="px-5 py-auto">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleSingleCheck(e.target.checked, data.id as number)
                    }
                    checked={checkedMenu.includes(
                      data.id?.toString() as string
                    )}
                  />
                </div>
                <div className="w-1/6">{index + 1}</div>
                <div className="w-3/6">{data.name}</div>
                <div className="w-2/6">{data.price} 원</div>
                {data.imageUrl ? (
                  <div className="w-2/6">
                    <img
                      className="w-[40px] h-[40px] mx-auto"
                      src={data.imageUrl}
                      alt="메뉴이미지"
                    />
                  </div>
                ) : (
                  <div className="w-2/6">
                    <img
                      className="w-[40px] h-[40px] mx-auto"
                      src="http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                      alt="이미지없음"
                    />
                  </div>
                )}
                <div className="w-2/6">
                  {data.status === 'ON_SALE' ? (
                    <div>판매중</div>
                  ) : (
                    <div>품절</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>메뉴 없음</div>
          )}
        </div>
      </div>
    </div>
  );
}
