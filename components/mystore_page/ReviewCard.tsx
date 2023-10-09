import axios from '@/lib/axios';
import { useState, useEffect } from 'react';

interface ReviewDataType {
  id: number;
  subject: string;
}

interface Props {
  restaurantId: number;
}

export default function ReviewCard({ restaurantId }: Props) {
  const [reviewList, setReviewList] = useState<ReviewDataType[]>();

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
      console.error('매장의 리뷰 목록', error);
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
          reviewList.map((review) => (
            <div key={review.id}>
              <div className="font-bold">{review.subject}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
