import { create } from 'zustand';

import { IUser } from '@/types/auth.type';
import devtools from '@/lib/zustand/devtools';

type IUserUser = {
  user: IUser | undefined;
  setUser: (p: IUser) => void;
  clearUser: () => void;
};

const useUser = create<IUserUser>()(
  devtools((set) => ({
    user: undefined,
    setUser: (userData: IUser) => set(() => ({ user: userData })),
    clearUser: () => set(() => ({ user: undefined })),
  })),
);

export default useUser;
