import { useRouter } from 'next/router';
import { useState } from 'react';
import NumOfVisitor from './NumsOfVisitor';
import WaitingLayOut from '../waiting/WaitingLayOut';
import WaitingTopHeader from '../waiting/WaitingTopHeader';

interface previousComponentProps {
  count: number;
}

export default function WaitingRegistration({ count }: previousComponentProps) {
  const [previousComponent, setPreviousComponent] = useState(false);
  const router = useRouter();
  const { storeId } = router.query;

  console.log(storeId);

  return (
    <>
      {previousComponent ? (
        <NumOfVisitor/>
      ) : (
        <WaitingLayOut>
          <WaitingTopHeader
            children="웨이팅 등록하기"
            linkOrButton={false}
            onClick={() => setPreviousComponent(true)}
          />
          <div className="select-visitor pb-8 border-b-8">
            <h1 className="text-2xl font-bold px-5 my-6">
              {storeId}에<br />
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
            <div className="pb-4 px-5 flex-col">
              <button className="btn btn-warning text-white w-full">
                웨이팅 등록하기
              </button>
            </div>
          </div>
        </WaitingLayOut>
      )}
    </>
  );
}
