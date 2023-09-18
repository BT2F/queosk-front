import { placeholderImgUrl } from '@/lib/placeholderImgUrl';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { USER_QUEUES } from '@/constants/user_queue';
import Header from '../common/Header';


type restaurantDtoType = {
  address: string;
  businessNumber: string;
  businessStartDate: string;
  category: string;
  email: string;
  id: number;
  imageUrl: string;
  maxWaiting: string | null;
  operationStatus: string;
  ownerId: string;
  ownerName: string;
  phone: string | null;
  ratingAverage: null;
  region: string;
  restaurantName: string;
  restaurantPhone: string;
};

type UserQueue = {
  id: number;
  restaurantDto: restaurantDtoType;
  userQueueIndex: number;
};

export default function MyWaiting() {
  const router = useRouter();

  const realTimeQueueCheck = (id:number) => {
    router.push(`/store/${id}/waiting`)
  }

  const axiosUserQueue = async () => {
    const response = await axios.get(`/api/users/queue`);
    const data = response.data.userQueues;
    return data;
  };

  const { data: userQueues, error } = useQuery<UserQueue[]>({
    queryKey: [USER_QUEUES.USER_QUEUES_DATA],
    queryFn: axiosUserQueue,
  });

  if (error) {
    console.error('유저 큐 로드 오류', error);
  }

  if(!userQueues) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div className={`w-full min-h-screen mx-auto relative`}>
        <Header title={'나의 웨이팅'} href={'/store'} />
        <div className="waiting-list grid grid-cols-1 min-[500px]:grid-cols-2 gap-4 p-2">
          {userQueues.map((item) => {
            return (
              <div
                className="card bg-base-100 shadow-lg mb-8"
                key={item.restaurantDto.id}
              >
                <figure className="max-h-[160px]">
                  <img
                    src={
                      item.restaurantDto.imageUrl ||
                      placeholderImgUrl('304x160')
                    }
                    alt="매장 이미지"
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title">
                    {item.restaurantDto.restaurantName}
                  </h2>
                  <div className="flex items-center justify-between">
                    <span>나의 대기순서</span>
                    <span className="font-bold text-[24px]">{item.userQueueIndex}</span>
                  </div>
                  <div className="card-actions mt-auto">
                    <button
                      className="btn bg-yellow-400 hover:bg-yellow-300 w-full"
                      onClick={() => realTimeQueueCheck(item.restaurantDto.id)}
                    >
                      실시간 확인
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
