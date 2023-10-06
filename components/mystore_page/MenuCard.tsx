import axios from '@/lib/axios';
import { useState, useEffect } from 'react';

interface MenuItem {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  restaurantId: number;
  status: 'ON_SALE' | 'SOLD_OUT';
}

interface MenuDataType {
  menuList: MenuItem[];
}

export default function MenuCard() {
  const [menuData, setMenuData] = useState<MenuDataType>();
  const [restaurantId, setRestaurantId] = useState<number>();

  const getRestaurantInfo = async () => {
    try {
      const response = await axios.get('api/restaurants');
      const data = response.data;
      // setStoreInfo(data);
      setRestaurantId(data.id);
    } catch (error) {
      console.error('매장 정보', error);
    }
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getMenuList = async () => {
    try {
      if (restaurantId !== undefined) {
        const response = await axios.get(
          `api/restaurants/${restaurantId}/menus`
        );
        const data = response.data;
        setMenuData(data);
      }
    } catch (error) {
      console.error('매장의 메뉴 목록', error);
    }
  };
  useEffect(() => {
    getMenuList();
  }, [restaurantId]);

  return (
    <div className="card w-1/2 h-screen bg-base-100 shadow-xl flex flex-col mb-10 mx-0">
      <h1 className="text-xl font-bold absolute top-5 left-5">메뉴</h1>
      <div className="ml-10 mt-20 flex flex-col gap-10">
        {menuData && menuData.menuList.length > 0 ? (
          menuData.menuList.map((data, index) => (
            <div className="flex" key={index}>
              <img
                src={
                  data.imageUrl
                    ? data.imageUrl
                    : 'http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg'
                }
                className="w-[100px] h-[100px] rounded-xl object-cover"
                alt={data.name}
              />

              <div className="my-auto mx-10">
                <h2 className="card-title pb-3">{data.name}</h2>
                <p>{data.price.toLocaleString()}원</p>
              </div>
            </div>
          ))
        ) : (
          <div>메뉴 없음</div>
        )}
      </div>
    </div>
  );
}
