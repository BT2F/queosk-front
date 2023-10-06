export default function OrderCard() {
  return (
    <div className="card w-1/2 h-[200px] bg-base-100 shadow-xl flex flex-col mb-10 mx-0">
      <h1 className="text-xl font-bold absolute top-5 left-5">주문 현황</h1>
      <div className="w-full absolute top-20 flex justify-around items-center">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-3">40</h3>
          <p className="text-gray-400 font-semibold">전체</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-3">10</h3>
          <p className="text-gray-400 font-semibold">처리중</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-3">30</h3>
          <p className="text-gray-400 font-semibold">완료</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-3">20</h3>
          <p className="text-gray-400 font-semibold">대기팀</p>
        </div>
      </div>
    </div>
  );
}
