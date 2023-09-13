import axios from '@/lib/axios';
import { useState, useEffect } from 'react';
import Header from '@/components/mystore_page/Header';
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

interface StoreInfoType {
  id: number;
  restaurantName: string;
  address: string;
  imageUrl: null | string;
}

export default function MystorePageView() {
  const [menuData, setMenuData] = useState<MenuDataType>();
  const [storeInfo, setStoreInfo] = useState<StoreInfoType>();

  const getMenuList = async () => {
    try {
      const response = await axios.get('api/restaurants/6/menus');
      const data = response.data;
      setMenuData(data);
    } catch (error) {
      console.log('매장의 메뉴 목록', error);
    }
  };

  useEffect(() => {
    getMenuList();
  }, []);

  const getRestaurantInfo = async () => {
    try {
      const response = await axios.get('api/restaurants');
      const data = response.data;
      console.log(data);
      setStoreInfo(data);
    } catch (error) {
      console.log('매장 정보', error);
    }
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  return (
    <div>
      <Header />

      <div className="w-[500px] mx-auto">
        {storeInfo ? (
          <div className="w-[500px]">
            <img
              src="http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
              className="w-[100px] h-[100px] bg-blue-100 absolute top-[40px] left-[30px] rounded-lg"
              alt="이미지 없음"
            />
            <div className="mt-[80px] my-[30px]">
              <div className="text-3xl font-bold mb-3">
                {storeInfo.restaurantName}
              </div>
              <div>{storeInfo.address}</div>
            </div>
          </div>
        ) : (
          <span className="loading loading-dots loading-md"></span>
        )}

        <div className="text-2xl font-bold mb-4">메뉴</div>
        {menuData && menuData.menuList.length > 0 ? (
          menuData.menuList.map((data, index) => (
            <div className="card w-[500px] h-[100px] bg-base-100 shadow-xl flex flex-row mb-10 mx-0">
              <figure>
                {data.imageUrl ? (
                  <img
                    src={data.imageUrl}
                    className="w-[100px]"
                    alt={data.name}
                  />
                ) : (
                  <img
                    src="http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                    className="w-[100px]"
                    alt="이미지 없음"
                  />
                )}
              </figure>
              <div className="my-auto mx-6">
                <h2 className="card-title pb-3">{data.name}</h2>
                <p>{data.price}원</p>
              </div>
            </div>
          ))
        ) : (
          <span className="loading loading-dots loading-md"></span>
        )}
      </div>
    </div>
  );
}
