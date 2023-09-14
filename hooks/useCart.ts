import { create } from 'zustand';
import devtools from '@/lib/zustand/devtools';
import { IMenuRes } from '@/types/store.type';
import { persist } from 'zustand/middleware';
import { STORE_LIST_KEY } from '@/constants/store_list';
import { toast } from 'react-toastify';

interface ICart {
  storeId: string;
  tableId: string;
  menuList: {
    id: number;
    restaurantId: number;
    name: string;
    imageUrl: string;
    price: number;
    status: string;
    count: number;
  }[];
}
interface IUseCart {
  cart: ICart;
  add: (p: IMenuRes) => void;
  init: (storeId: string, tableId: string) => void;
  clear: (storeId: string, tableId: string) => void;
  deleteItem: (id: number) => void;
  updateCount: (id: number, count: number) => void;
}

const initialState: ICart = {
  storeId: '',
  tableId: '',
  menuList: [],
};

const useCart = create<IUseCart>()(
  devtools(
    persist(
      (set) => ({
        cart: initialState,

        add: (p) =>
          set((state) => {
            const inCartItem = state.cart.menuList.find((v) => v.id === p.id);
            toast.success(`장바구니에 ${p.name} 추가!`);
            return {
              cart: {
                ...state.cart,
                menuList: [
                  ...state.cart.menuList.filter((v) => v.id !== inCartItem?.id),
                  !!inCartItem
                    ? { ...inCartItem, count: inCartItem.count + 1 }
                    : { ...p, count: 1 },
                ],
              },
            };
          }),

        init: (storeId, tableId) =>
          set(() => ({ cart: { ...initialState, storeId, tableId } })),

        clear: (storeId, tableId) =>
          set((state) => ({ cart: { ...state.cart, storeId, tableId } })),

        deleteItem: (id) =>
          set((state) => ({
            cart: {
              ...state.cart,
              menuList: state.cart.menuList.filter((v) => v.id !== id),
            },
          })),

        updateCount: (id, count) =>
          set((state) => ({
            cart: {
              ...state.cart,
              menuList: state.cart.menuList.map((v) =>
                v.id === id ? { ...v, count } : v,
              ),
            },
          })),
      }),
      { name: STORE_LIST_KEY.CART },
    ),
  ),
);

export default useCart;
