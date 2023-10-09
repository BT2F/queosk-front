import axios from '@/lib/axios';
import { useState, useEffect } from 'react';
import Nav from '@/components/common/mystore/Nav';
import MyStoreHeader from '@/components/mystore_page/MyStoreHeader';
import OrderCard from '@/components/mystore_page/OrderCard';
import RatingCard from '@/components/mystore_page/RatingCard';
import MenuCard from '@/components/mystore_page/MenuCard';
import ReviewCard from '@/components/mystore_page/ReviewCard';

export default function MystorePageView() {
  const [restaurantId, setRestaurantId] = useState<number>();
  const getRestaurantInfo = async () => {
    try {
      const response = await axios.get('api/restaurants');
      const data = response.data;
      setRestaurantId(data.id);
    } catch (error) {
      console.error('매장 정보', error);
    }
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  return (
    <div className="flex">
      <Nav />
      <div className="mx-0 w-full">
        <MyStoreHeader />

        <div className="w-6/7 h-full mt-10 mx-10">
          <div className="flex justify-between gap-5">
            <OrderCard />
            <RatingCard restaurantId={restaurantId as number} />
          </div>

          <div className="w-full h-full flex justify-center gap-5">
            <MenuCard restaurantId={restaurantId as number} />
            <ReviewCard restaurantId={restaurantId as number} />
          </div>
        </div>
      </div>
    </div>
  );
}
