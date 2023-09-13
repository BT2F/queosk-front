import { create } from 'zustand';
import devtools from '@/lib/zustand/devtools';
import { persist } from 'zustand/middleware';
import { PAYMENT_KEY } from '@/constants/payment';
import { createId } from '@paralleldrive/cuid2';

interface IPayment {
  partnerOrderId: string;
  payload: string;
  totalAmount: number;
}
interface IUsePayment {
  payment: IPayment;
  setPayment: (payload: string, totalAmount: number) => void;
  clear: () => void;
}

const initialState: IPayment = {
  partnerOrderId: createId(),
  payload: '',
  totalAmount: 0,
};

const usePayment = create<IUsePayment>()(
  devtools(
    persist(
      (set) => ({
        payment: initialState,
        setPayment: (payload, totalAmount) =>
          set(() => ({ payment: { ...initialState, payload, totalAmount } })),
        clear: () => set(() => ({ payment: initialState })),
      }),
      {
        name: PAYMENT_KEY.ZUSTAND_PERSIST,
      },
    ),
  ),
);

export default usePayment;
