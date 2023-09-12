import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NumsOfVisitor from './NumsOfVisitor';
import WaitingLayOut from '../../waiting/WaitingLayOut';
import WaitingTopHeader from '../../waiting/WaitingTopHeader';
import WaitingButton from '../../waiting/WaitingButton';
import axios from '@/lib/axios';

interface previousComponentProps {
  count: number;
  // store: Object;
}

export default function WaitingRegistration({ count }: previousComponentProps) {
  const [previousComponent, setPreviousComponent] = useState(false);
  const router = useRouter();
  const { storeId } = router.query;
  const [storeData, setStoreData] = useState(Object)
  console.log(storeId);

  const handleResistration = async () => {
    const numberOfPeople = {
      numberOfParty: count
    }

    try {
      await axios.post(`/api/restaurants/${storeId}/queue`, numberOfPeople);
      console.log(numberOfPeople)
      console.log('등록 성공')
      alert('웨이팅 등록에 성공했습니다.')
      router.push(`/store/${storeId}/waiting`)
    } catch(error) {
      console.error('등록 실패', error)
    }
  }

  useEffect(() => {
    const getServerData = async () => {
      try {
        const response = await axios.get(`/api/restaurants/1/details`);
        const data = response.data;
        setStoreData(data.restaurantDto);
      } catch (error) {
        console.error('데이터 로드 오류', error);
      }

    };
    const getStoreQueue = async () => {
      try {
        const response = await axios.get(`/api/restaurants/queue/`);
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error('데이터 로드 오류', error);
      }
    }
    getStoreQueue();
    getServerData();
  }, []);

  return (
    <>
      {previousComponent ? (
        <NumsOfVisitor numOfCount={count} />
      ) : (
        <WaitingLayOut>
          <WaitingTopHeader
            children="웨이팅 등록하기"
            linkOrButton={false}
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
                  <h2>팀</h2>
                </div>
                <div className="w-[50%] py-4 flex-col text-center">
                  <h2 className="text-gray-400 text-base">예상 시간</h2>
                  <h2>분</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-6 mt-6 font-bold text-lg">
            <h3>총 입장 인원</h3>
            <h3>{count}명</h3>
          </div>
          <div className="waiting-footer fixed bottom-0 max-w-[80%] md:max-w-[640px] w-[100%]">
            <div className="flex-col">
              <WaitingButton children={'웨이팅 등록하기'} onClick={handleResistration}/>
            </div>
          </div>
        </WaitingLayOut>
      )}
    </>
  );
}
