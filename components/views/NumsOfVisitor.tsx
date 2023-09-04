import WaitingRegistration from './WaitingResistration';
import { useRouter } from 'next/router';
import { useState } from 'react';
import WaitingLayOut from '../waiting/WaitingLayOut';
import WaitingTopHeader from '../waiting/WaitingTopHeader';
import WaitingButton from '../waiting/WaitingButton';

interface numOfCountProps {
  numOfCount?:number;
}


export default function NumsOfVisitor({numOfCount}: numOfCountProps) {
  const [count, setCount] = useState(numOfCount ? numOfCount : 1);
  const [showNextComponent, setShowNextComponent] = useState(false);
  const router = useRouter();
  const { storeId } = router.query;
  
  console.log(showNextComponent)

  return (
    <>
      {showNextComponent ? (
        <WaitingRegistration count={count} />
      ) : (
        <WaitingLayOut>
          <WaitingTopHeader
            children={'방문 인원 선택하기'}
            linkOrButton={true}
            storeId={storeId}
          />
          <div className="select-visitor">
            <h1 className="text-xl font-bold px-5 mt-4">
              방문 인원을 선택해주세요.
            </h1>
            <div className="count-visitor">
              <div className="number mt-4 text-xl font-bold p-5 flex justify-between">
                <h2>인원수</h2>
                <div className="count flex items-center">
                  <button
                    className="border rounded-full w-6 h-6 flex justify-center items-center"
                    onClick={() => {
                      if (count <= 1) {
                        return count;
                      }
                      setCount(count - 1);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    name="count"
                    min={1}
                    value={count}
                    className="w-10 text-center"
                    readOnly
                  />
                  <button
                    className="border rounded-full w-6 h-6 flex justify-center items-center"
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="waiting-footer fixed bottom-0 max-w-[80%] md:max-w-[640px] w-full">
            <div className="font-bold flex justify-between mx-4 p-4 border-t">
              <span>방문 인원</span>
              <span>총 {count} 명</span>
            </div>
            <WaitingButton children="다음" onClick={()=> {setShowNextComponent((prevValue) => !prevValue)}} />
          </div>
        </WaitingLayOut>
      )}
    </>
  );
}
