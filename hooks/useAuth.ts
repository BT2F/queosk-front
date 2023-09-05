import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AUTH_MESSAGE } from '@/constants/auth';
import useUser from '@/hooks/useUser';

export default function useAuth() {
  const router = useRouter();
  const { setUser } = useUser();
  const signIn = async (
    data: { id?: string; password?: string; code?: string },
    type: 'user' | 'restaurant' | 'OAuth' = 'user',
  ) => {
    if (type !== 'OAuth') {
      await axios
        .post(`/api/${type}s/signin`, data)
        .then((res) => {
          const { accessToken, refreshToken, ...userData } = res.data;
          setUser(userData);
        })
        .catch((e) =>
          toast.error(e.response.data.message || AUTH_MESSAGE.SIGN_IN_ERROR),
        );
    } else {
      // 현재는 경로가 존재하지 않음
    }
  };

  const singUp = async (
    data: {
      id: string;
      password: string;
      email: string;
      phone: string;
      address?: string;
      businessNum?: string;
    },
    type: 'restaurant' | 'user' = 'user',
  ) =>
    await axios.post(`/api/${type}/signup`, data).then(() => {
      router.replace(type === 'user' ? '/' : '/mystore');
    });

  const signOut = async (type: 'restaurant' | 'user' = 'user') =>
    await axios
      .post(`/api/${type}/signout`)
      .then(() => router.replace('/'))
      .catch((e) =>
        toast.error(e.response.data.message || AUTH_MESSAGE.SIGN_OUT_ERROR),
      );

  return {
    signIn,
    singUp,
    signOut,
  };
}
