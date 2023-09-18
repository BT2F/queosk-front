import { useRouter } from 'next/router';
import { useState } from 'react';
import NumsOfVisitor from './NumsOfVisitor';
import WaitingLayOut from '../../waiting/WaitingLayOut';
import WaitingTopHeader from '../../waiting/WaitingTopHeader';
import WaitingButton from '../../waiting/WaitingButton';
import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { STORE_DATA } from '@/constants/user_queue';
import { AxiosError } from 'axios';
import Header from '@/components/common/Header';
interface previousComponentProps {
  count: number;
}

export default function WaitingRegistration({ count }: previousComponentProps) {
  const [previousComponent, setPreviousComponent] = useState(false);
  const router = useRouter();
  const { storeId } = router.query;
  // const [storeData, setStoreData] = useState(Object);
  // const [queueData, setQueueData] = useState(Object);

  // 매장 정보 가져오기
  const getStoreData = async () => {
    try {
      const response = await axios.get(`/api/restaurants/${storeId}/details`);
      const data = response.data.restaurantDto;
      return data;
    } catch (error) {
      console.error('데이터 로드 오류', error);
    }
  };

  // 매장 대기열 정보 가져오기
  const getStoreQueue = async () => {
    try {
      const response = await axios.get(`/api/restaurants/${storeId}/queue`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('데이터 로드 오류', error);
    }
  };

  const { data: storeData, error } = useQuery({
    queryKey: [STORE_DATA.STORE_DATA],
    queryFn: getStoreData,
  });
  if (error) {
    console.error('매장 정보 불러오기 실패', error);
  }

  const { data: storeQueue } = useQuery({
    queryKey: [STORE_DATA.STORE_QUEUE],
    queryFn: getStoreQueue,
  });

  // 매장대기열에 내 대기가 존재하는지 여부 판단위해 이 식당의 내 대기열 가져오기
  const getQueueData = async () => {
    const response = await axios.get(`/api/restaurants/${storeId}/user/queue/`);
    return response.data;
  };

  const handleResistration = async () => {
    const numberOfPeople = {
      numberOfParty: count,
    };

    try {
      await getQueueData();
      alert('이미 웨이팅 등록이 되어 있습니다!');
      router.push(`/store/${storeId}`);
    } catch (error) {
      // getQueueData가 404 에러를 반환하면 웨이팅을 등록합니다.
      if(error instanceof AxiosError) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 404) {
          try {
            await axios.post(
              `/api/restaurants/${storeId}/queue`,
              numberOfPeople
            );
            alert('웨이팅 등록에 성공했습니다.');
            router.push(`/store/${storeId}/waiting`);
          } catch (registrationError) {
            console.error('등록 실패', registrationError);
          }
        } else {
          console.error('다른 오류 발생', error);
        }
      }
      
    }
  };

  console.log(storeData);
  console.log(storeQueue);

  return (
    <>
      {previousComponent ? (
        <NumsOfVisitor numOfCount={count} />
      ) : (
        <WaitingLayOut>
          <WaitingTopHeader
            children="웨이팅 등록하기"
            onClick={() => setPreviousComponent(true)}
          />
          <div className="select-visitor pb-8 border-b-8">
            <h1 className="text-xl font-bold px-5 my-6">
              {storeData.restaurantName}에<br />
              웨이팅 등록하시겠어요?
            </h1>
            <div className="count-visitor">
              <div className="number mx-5 border-2 rounded-lg text-xl font-bold p-5 flex justify-between py-6">
                <div className="w-[50%] py-4 flex-col text-center">
                  <h2 className="text-gray-400 text-base">현재 웨이팅</h2>
                  <h2 className="animation-pulse">
                    {storeQueue.totalQueue} 팀
                  </h2>
                </div>
                <div className="w-[50%] py-4 flex-col text-center">
                  <h2 className="text-gray-400 text-base">예상 시간</h2>
                  <h2 className="animation-pulse">
                    {storeQueue.totalQueue * 15} 분
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-6 mt-6 font-bold text-lg">
            <h3>총 입장 인원</h3>
            <h3>{count}명</h3>
          </div>
          <div className="waiting-footer fixed bottom-0 left-0 right-0 max-w-[640px] mx-auto">
            <div className="flex-col">
              <WaitingButton
                children={'웨이팅 등록하기'}
                onClick={handleResistration}
              />
            </div>
          </div>
        </WaitingLayOut>
      )}
    </>
  );
}
