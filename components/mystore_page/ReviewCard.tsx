import axios from '@/lib/axios';
import { useState, useEffect } from 'react';

export default function ReviewCard() {
  const [restaurantId, setRestaurantId] = useState<number>();
  const [reviewList, setReviewList] = useState<any>();

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
    getReviewList();
  }, [restaurantId]);

  return (
    <div className="card w-1/2 h-screen bg-base-100 shadow-xl flex flex-col mb-10 mx-0">
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
    </div>
  );
}
