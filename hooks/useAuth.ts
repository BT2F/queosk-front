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
      return await axios
        .post(`/api/${type}s/signin`, data)
        .then((res) => {
          const { accessToken, refreshToken, ...userData } = res.data;
          setUser(userData);
          router.replace(type === 'user' ? '/store' : '/mystore');
        })
        .catch((e) =>
          toast.error(e.response.data.message || AUTH_MESSAGE.SIGN_IN_ERROR),
        );
    } else {
      return await axios
        .post('/api/kakao/signin', { code: data.code })
        .then(() => {
          router.replace('/store');
        })
        .catch((e) =>
          toast.error(e.response.data.message || AUTH_MESSAGE.SIGN_IN_ERROR),
        );
    }
  };

  const signUp = async (
    data: {
      password?: string;
      email?: string;
      nickName?: string;
      address?: string;
      businessNum?: string;
      ownerId?: string;
      phone?: string;
      ownerName?: string;
      passwordCheck?: string;
      restaurantPhone?: string;
      restaurantName?: string;
      category?: string;
      businessNumber?: string;
      businessStartDate?: string;
      addressDetail?: string;
    },
    type: 'restaurant' | 'user' = 'user',
  ) =>
    await axios
      .post(`/api/${type}s/signup`, data)
      .then(() =>
        router.replace(type === 'user' ? '/signin' : '/mystore/signin'),
      )
      .catch((e) => {
        toast.error(e.response.data.message || AUTH_MESSAGE.SIGN_IN_ERROR);
      });

  const signOut = async (type: 'restaurant' | 'user' = 'user') =>
    await axios
      .post(`/api/${type}s/signout`)
      .then(() => router.replace('/'))
      .catch((e) =>
        toast.error(e.response.data.message || AUTH_MESSAGE.SIGN_OUT_ERROR),
      );

  const OAuthRedirect = (type: 'kakao' = 'kakao') => {
    if (type === 'kakao') {
      router.replace(
        `https://kauth.kakao.com/oauth/authorize?client_id=${
          process.env.NEXT_PUBLIC_KAKAO_CLIENT || ''
        }&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code`,
      );
    }
  };
  return {
    signIn,
    signUp,
    signOut,
    OAuthRedirect,
  };
}
