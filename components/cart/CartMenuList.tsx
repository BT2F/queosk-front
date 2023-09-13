import useCart from '@/hooks/useCart';
import CartMenuCard from '@/components/cart/CartMenuCard';

export default function CartMenuList() {
  const { cart } = useCart();

  return (
    <div className="p-2">
      {cart.menuList?.map((v) => <CartMenuCard {...v} key={v.id} />)}
    </div>
  );
}
