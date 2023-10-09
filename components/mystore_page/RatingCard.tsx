import axios from '@/lib/axios';
import { useState, useEffect } from 'react';

interface RatingDataType {
  id: number;
  rate: number;
}

interface Props {
  restaurantId: number;
}

export default function RatingCard({ restaurantId }: Props) {
  const [ratingAvg, setRatingAvg] = useState<number | null>(null);
  const [rating1, setRating1] = useState<number>(0);
  const [rating2, setRating2] = useState<number>(0);
  const [rating3, setRating3] = useState<number>(0);
  const [rating4, setRating4] = useState<number>(0);
  const [rating5, setRating5] = useState<number>(0);

  const getRating = async () => {
    try {
      if (restaurantId !== undefined) {
        const response = await axios.get(
          `api/reviews/restaurants/${restaurantId}`
        );
        const data: RatingDataType[] = response.data;

        if (data.length > 0) {
          const ratingCounts = [0, 0, 0, 0, 0];

          data.forEach((ratingData) => {
            const rate = Math.floor(ratingData.rate);
            if (rate >= 1 && rate <= 5) {
              ratingCounts[rate - 1]++;
            }
          });

          const totalRatingCount = data.length;

          setRating1((ratingCounts[0] / totalRatingCount) * 100);
          setRating2((ratingCounts[1] / totalRatingCount) * 100);
          setRating3((ratingCounts[2] / totalRatingCount) * 100);
          setRating4((ratingCounts[3] / totalRatingCount) * 100);
          setRating5((ratingCounts[4] / totalRatingCount) * 100);

          const accRating = data.reduce((acc, ratingData) => {
            return acc + ratingData.rate;
          }, 0);

          const average = accRating / totalRatingCount;
          setRatingAvg(average);
        } else {
          setRatingAvg(null);
        }
      }
    } catch (error) {
      console.error('평점', error);
    }
  };

  useEffect(() => {
    getRating();
  }, [restaurantId]);

  return (
    <div className="card w-1/2 h-[200px] bg-base-100 shadow-xl flex flex-col mb-10 mx-0">
      <h1 className="text-xl font-bold absolute top-5 left-5">평점</h1>
      <div className="w-full absolute top-12 flex justify-around items-center ">
        <div className="w-full flex flex-row items-center justify-evenly">
          {ratingAvg !== null ? (
            <h3 className="text-5xl font-bold mb-3">
              {Math.floor(ratingAvg * 10) / 10}
            </h3>
          ) : (
            <h3 className="text-5xl font-bold mb-3">0</h3>
          )}
          <div className="w-3/5 flex">
            <div className="w-1/12 text-gray-400">
              <p>5</p>
              <p>4</p>
              <p>3</p>
              <p>2</p>
              <p>1</p>
            </div>
            <div className="w-11/12">
              <progress
                className="progress progress-warning"
                value={rating5}
                max="100"
              ></progress>
              <progress
                className="progress progress-warning "
                value={rating4}
                max="100"
              ></progress>
              <progress
                className="progress progress-warning "
                value={rating3}
                max="100"
              ></progress>
              <progress
                className="progress progress-warning "
                value={rating2}
                max="100"
              ></progress>
              <progress
                className="progress progress-warning"
                value={rating1}
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
