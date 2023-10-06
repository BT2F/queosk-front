import axios from '@/lib/axios';
import { useState, useEffect } from 'react';

interface StoreInfoType {
  id: number;
  restaurantName: string;
  address: string;
  imageUrl: null | string;
}

export default function StoreName() {
  const [storeInfo, setStoreInfo] = useState<StoreInfoType>();

  const getRestaurantInfo = async () => {
    try {
      const response = await axios.get('api/restaurants');
      const data = response.data;
      setStoreInfo(data);
    } catch (error) {
      console.error('매장 정보', error);
    }
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  return (
    <div>
      {storeInfo ? (
        <div className="w-full overflow-hidden relative">
          <div className="w-full h-[200px]">
            <img
              src={
                storeInfo.imageUrl
                  ? storeInfo.imageUrl
                  : 'http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg'
              }
              className="w-full h-full object-fill brightness-50"
              alt="로고"
            />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>

          <div className="flex flex-col absolute top-16 left-10 text-white">
            <h1 className="text-4xl font-bold mb-[15px]">
              {storeInfo.restaurantName}
            </h1>
            <p className="text-xl font-bold">{storeInfo.address}</p>
          </div>
        </div>
      ) : (
        <span className="loading loading-dots loading-md" />
      )}
    </div>
  );
}
