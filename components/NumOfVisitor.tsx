// import WaitingRegistration from '@/pages/store/[storeId]/waiting';
import WaitingRegistration from './WaitingResistration';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useReducer, useState } from 'react';

interface IncrementAction {
  type: 'INCREMENT';
}
interface DecrementAction {
  type: 'DECREMENT';
}

type Action = IncrementAction | DecrementAction;

function countReducer(state:number, action:Action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      if (state <= 1) {
        return state;
      }
      return state - 1;
    default:
      return state;
  }
}

export default function NumOfVisitor() {
  const [count, dispatch] = useReducer(countReducer, 1);
  const [showNextComponent, setShowNextComponent] = useState(false)
  const router = useRouter()
  const {storeId} = router.query;
  const toggleNextComponent = () => {
    setShowNextComponent((prevValue) => !prevValue);
  }

  console.log(showNextComponent)
  console.log(count)

  const onIncrease = () => {
    dispatch({ type: 'INCREMENT' });
  };
  const onDecrease = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <>
      {showNextComponent ? (
        <WaitingRegistration />
      ) : (
        <div className="num-of-visitor-container max-w-[80%] md:max-w-[640px] h-[100vh] mx-auto shadow-lg relative">
          <div className="flex text-2xl p-3 font-bold">
            <Link href={`/store/${storeId}`} className="mr-3">
              &#8592;
            </Link>
            <h1 className="">방문 인원 선택하기</h1>
          </div>
          <div className="select-visitor">
            <h1 className="text-2xl font-bold px-3 mt-4">
              방문 인원을 선택해주세요.
            </h1>
            <div className="count-visitor">
              <div className="number mt-4 text-xl font-bold p-5 flex justify-between">
                <h2>인원수</h2>
                <div className="count flex items-center">
                  <button
                    className="border rounded-full w-6 h-6 flex justify-center items-center"
                    onClick={onDecrease}
                  >
                    -
                  </button>
                  {/* {count} */}
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
                    onClick={onIncrease}
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
            <div className="pb-4 px-5 flex-col">
              <button
                className="btn btn-warning text-white w-full"
                onClick={toggleNextComponent}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
