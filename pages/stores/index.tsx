import StoreLists from '@/components/StoreLists';
import { useState } from 'react';

interface storeListType {
  id: number;
  title: string;
  imgSrc: string;
  address: string;
  phone: string;
  homepage: string;
}

const storeList = [
  {
    id: 1,
    title: '1호점',
    imgSrc: 'image',
    address: '1번가',
    phone: '123-1234',
    homepage: 'www.google.com',
  },
  {
    id: 2,
    title: '2호점',
    imgSrc: 'image',
    address: '2번가',
    phone: '123-1234',
    homepage: 'www.google.com',
  },
  {
    id: 3,
    title: '3호점',
    imgSrc: 'image',
    address: '3번가',
    phone: '123-1234',
    homepage: 'www.google.com',
  },
  {
    id: 4,
    title: '4호점',
    imgSrc: 'image',
    address: '4번가',
    phone: '123-1234',
    homepage: 'www.google.com',
  },
  {
    id: 5,
    title: '5호점',
    imgSrc: 'image',
    address: '5번가',
    phone: '123-1234',
    homepage: 'www.google.com',
  },
];

export default function StoreListPage() {
  const [selectedOption, setSelectedOption] = useState<string>('카테고리');

  return (
    <>
      <div className="bg-rose-200">
        <div className="pt-10 flex justify-center items-center">
          <select
            className="select select-sm select-bordered select-accent w-1/6 max-w-xs"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option disabled value="카테고리">
              카테고리
            </option>
            <option>한식</option>
            <option>중식</option>
            <option>양식</option>
            <option>일식</option>
          </select>
          <input
            type="text"
            placeholder="원하는 식당을 검색하세요"
            className="input input-sm input-bordered input-info w-7/12 ms-1"
          />
          <button className="btn btn-sm btn-info w-2/12">검색</button>
        </div>
        <div className="mt-10 flex flex-col justify-center items-center">
          {storeList.map((store) => (
            <StoreLists
              key={store.id}
              imgSrc={store.imgSrc}
              title={store.title}
              address={store.address}
            />
          ))}
        </div>

        <div className="join mt-5 pb-10 flex justify-center">
          <button className="join-item btn">«</button>
          <button className="join-item btn">이전</button>
          <button className="join-item btn btn-md btn-active">1</button>
          <button className="join-item btn btn-md">2</button>
          <button className="join-item btn btn-md">3</button>
          <button className="join-item btn btn-md">4</button>
          <button className="join-item btn">다음</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </>
  );
}
