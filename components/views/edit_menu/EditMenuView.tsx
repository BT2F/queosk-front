import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import Header from '@/components/common/Header';
import Nav from '@/components/common/mystore/Nav';
import Add from '@/components/edit_menu/MenuAdd';
import MenuModify from '@/components/edit_menu/MenuModify';
import MenuDelete from '@/components/edit_menu/MenuDelete';

interface MenuItem {
  id: number;
  name: string;
  imageUrl: string | null;
  price: number;
  status: 'ON_SALE' | 'SOLD_OUT';
}

interface MenuData {
  menuList: MenuItem[];
}

export default function EditMenuView() {
  const [restaurantId, setRestaurantId] = useState();
  const [menuData, setMenuData] = useState<MenuData>({ menuList: [] });

  const getRestaurantInfo = async () => {
    try {
      const response = await axios.get('/api/restaurants');
      const data = response.data;
      setRestaurantId(data.id);
    } catch (error) {
      console.error('매장 정보', error);
    }
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getMenuListData = async () => {
    try {
      if (restaurantId !== undefined) {
        const response = await axios.get(
          `/api/restaurants/${restaurantId}/menus`
        );
        const data = response.data;
        setMenuData(data);
      }
    } catch (error) {
      console.error('식당 메뉴 목록 조회', error);
    }
  };

  useEffect(() => {
    getMenuListData();
  }, [restaurantId]);

  return (
    <div className="flex">
      <Nav />
      <div className="w-full mt-5">
        <Header title="메뉴" isBack={false} />
        <div className="w-11/12 mx-auto">
          <table className="table mt-3">
            <thead>
              <tr>
                <th>번호</th>
                <th>이미지</th>
                <th>메뉴명</th>
                <th>가격</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {menuData.menuList.map((data) => (
                <tr key={data.id}>
                  <th>{data.id}</th>
                  <th>
                    {data.imageUrl ? (
                      <img
                        className="w-[40px] h-[40px] rounded-xl"
                        src={data.imageUrl}
                        alt="메뉴이미지"
                      />
                    ) : (
                      <img
                        className="w-[40px] h-[40px] rounded-xl"
                        src="http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                        alt="이미지없음"
                      />
                    )}
                  </th>
                  <th>{data.name}</th>
                  <th>{data.price.toLocaleString()}원</th>
                  <th>
                    {data.status === 'ON_SALE' ? (
                      <div>판매중</div>
                    ) : (
                      <div>품절</div>
                    )}
                  </th>
                  <th>
                    <MenuModify />
                    <MenuDelete refresh={getMenuListData} menuId={data.id} />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <Add refresh={getMenuListData} />
        </div>
      </div>
    </div>
  );
}
