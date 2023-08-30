import { MenuType } from '@/components/store_select_and_detail/Menu';
import { create } from 'zustand';

interface CartItemType extends MenuType {
  quantity: number;
}

interface StoreState {
  cart: CartItemType[];
}

const useStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (menu: MenuType) => {
    set((state) => {
      const newCart = [...state.cart];
      const existingCartItem = newCart.find(
        (item) => item.menuName === menu.menuName
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        newCart.push({ ...menu, quantity: 1 });
      }

      return { cart: newCart };
    });
  },
}));

export default useStore;
