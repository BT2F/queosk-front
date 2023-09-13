export default function Header() {
  return (
    <div className="flex justify-end items-center bg-yellow-400 w-full h-[80px]">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn m-1 mx-5 ">
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
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[150px]"
        >
          <li>
            <a href="/mystore/menu/edit">
              <div className="btn btn-outline btn-warning w-[110px]">
                메뉴 등록
              </div>
            </a>
          </li>
          <li>
            <a href="/mystore/state">
              <div className="btn btn-outline btn-warning w-[110px]">
                실시간 주문
              </div>
            </a>
          </li>
          <li>
            <a href="/mystore/tables">
              <div className="btn  btn-outline btn-warning w-[110px]">
                테이블 현황
              </div>
            </a>
          </li>
          <li>
            <a href="/mystore/settlement">
              <div className="btn btn-outline btn-warning w-[110px]">
                정산 내역
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
