import axios from '@/lib/axios';
import { useState, useEffect } from 'react';
import Nav from '@/components/common/mystore/Nav';
import MyStoreHeader from '@/components/mystore_page/MyStoreHeader';
import OrderCard from '@/components/mystore_page/OrderCard';
import RatingCard from '@/components/mystore_page/RatingCard';
import MenuCard from '@/components/mystore_page/MenuCard';
import ReviewCard from '@/components/mystore_page/ReviewCard';

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
  const [restaurantId, setRestaurantId] = useState<number>();
  const [reviewList, setReviewList] = useState<any>();

  const getRestaurantInfo = async () => {
    try {
      const response = await axios.get('api/restaurants');
      const data = response.data;
      setStoreInfo(data);
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

  const getReviewList = async () => {
    try {
      if (restaurantId !== undefined) {
        const response = await axios.get(
          `api/reviews/restaurants/${restaurantId}`
        );
        const data = response.data;
        setReviewList(data);
      }
    } catch (error) {
      console.error('매장의 메뉴 목록', error);
    }
  };

  useEffect(() => {
    getMenuList();
    getReviewList();
  }, [restaurantId]);

  return (
    <div className="flex">
      <Nav />
      <div className="mx-0 w-full">
        <MyStoreHeader />

        <div className="w-6/7 h-full mt-10 mx-10">
          <div className="flex justify-between gap-5">
            <OrderCard />
            <RatingCard />
          </div>

          <div className="w-full h-full flex justify-center gap-5">
            <MenuCard />
            {/* <div className="card w-1/2 h-screen bg-base-100 shadow-xl flex flex-col mb-10 mx-0">
              <h1 className="text-xl font-bold absolute top-5 left-5">리뷰</h1>
              <div className="ml-10 mt-20 flex flex-col gap-10">
                {reviewList &&
                  reviewList.map((data: any, index: any) => (
                    <div key={index}>
                      <div className="font-semibold text-gray-400 font-sm text-xl">
                        {data.subject}
                      </div>
                    </div>
                  ))}
              </div>
            </div> */}
            <ReviewCard />
          </div>
        </div>
      </div>
    </div>
  );
}
