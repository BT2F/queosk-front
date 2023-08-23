import Menu from '@/components/Menu';
import MenuCategory from '@/components/MenuCategory';
import { useRouter } from 'next/router';
import { useState } from 'react';

const menuCategory = ['면류', '탕류', '식사류', '주류', '디저트'];

export default function MenuPage() {
  const [cartCount, setCartCount] = useState<number>(0);
  const router = useRouter();

  const { tableId } = router.query;

  const handleAddCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <>
      <div className="relative h-28">
        <div className="absolute top-0 right-0 w-36 h-36 me-3 flex flex-col justify-center items-center bg-red-500 text-white rounded-b-lg">
          <div className="text-center font-semibold">테이블 번호</div>
          <div className="text-center font-bold text-6xl mt-3">{tableId}</div>
        </div>
      </div>

      <div className="flex ms-3 me-3">
        <div className="flex flex-col gap-2">
          {menuCategory.map((category) => (
            <MenuCategory categoryName={category} />
          ))}
        </div>
        <div className="flex justify-evenly m-10 mb-5 pb-5 gap-10 w-full h-120 flex-wrap overflow-y-auto">
          <Menu menuName="메뉴1" menuPrice="15,300" />
          <Menu menuName="메뉴2" menuPrice="15,300" />
          <Menu menuName="메뉴3" menuPrice="15,300" />
          <Menu menuName="메뉴4" menuPrice="15,300" />
          <Menu menuName="메뉴5" menuPrice="15,300" />
          <Menu menuName="메뉴6" menuPrice="15,300" />
          <Menu menuName="메뉴7" menuPrice="15,300" />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="btn btn-active btn-neutral w-3/12">계산서</button>
        <button className="btn btn-active btn-neutral ms-10 w-3/12 relative">
          장바구니 / 결제
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex justify-center items-center ml-2 bg-red-500 text-white rounded-full w-6 h-6 text-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
