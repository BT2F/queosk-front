import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex justify-end items-center bg-yellow-400 w-full h-[80px]">
      <div className="dropdown dropdown-end dropdown-hover">
        <label
          tabIndex={0}
          className="btn m-1 mx-5 bg-transparent border-none"
          id="label"
        >
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[150px] flex gap-3 items-center"
        >
          <li>
            <button className="btn btn-outline btn-warning w-[120px]">
              <Link href="/mystore/menu/edit">메뉴 등록</Link>
            </button>
          </li>
          <li>
            <button className="btn btn-outline btn-warning w-[120px]">
              <Link href="/mystore/state">실시간 주문</Link>
            </button>
          </li>
          <li>
            <button className="btn btn-outline btn-warning w-[120px]">
              <Link href="/mystore/tables">테이블 현황</Link>
            </button>
          </li>
          <li>
            <button className="btn btn-outline btn-warning w-[120px]">
              <Link href="/mystore/settlement">정산 내역</Link>
            </button>
          </li>
        </ul>
      </div>
      <style>
        {`
          #label:hover {
            background-color: transparent;
          }
        `}
      </style>
    </div>
  );
}
