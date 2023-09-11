import { AUTH_KEY, AUTH_MESSAGE } from '@/constants/auth';
import { default as axiosDefault } from 'axios';
import { toast } from 'react-toastify';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const axios = axiosDefault.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    Authorization: `Bearer ${getCookie(AUTH_KEY.ACCESS_TOKEN)}`,
  },
});

const isDev = process.env.NODE_ENV === 'development';
// 요청 인터셉터
axios.interceptors.request.use((config) => {
  let token = getCookie(
    config.url!.includes('token')
      ? AUTH_KEY.REFRESH_TOKEN
      : AUTH_KEY.ACCESS_TOKEN,
  );

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// 응답 인터셉터
axios.interceptors.response.use(
  (res) => {
    if (res.config.url?.includes('signin')) {
      setCookie(AUTH_KEY.ACCESS_TOKEN, res.data.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
      });
      setCookie(AUTH_KEY.REFRESH_TOKEN, res.data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
      });
    }
    return res;
  },
  async (err) => {
    const { config, request } = err;

    if (request?.status === 401) {
      // 비 인증 상태 일때
      return await axios
        .post(
          `/api/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getCookie(AUTH_KEY.REFRESH_TOKEN)}`,
            },
          },
        )
        .then((res) => {
          // 비인증 상태에서 성공적으로 토큰이 갱신된 경우
          // 인증 정보를 저정한 이후 다시 요청을 보낸다.

          setCookie(AUTH_KEY.ACCESS_TOKEN, res.data.accessToken, {
            maxAge: 30 * 24 * 60 * 60,
          });

          config.headers.Authorization = `Bearer ${res.data.accessToken}`;

          return axios(config);
        })
        .catch(() => {
          // 비인증 상태에서 요청이 반려된 경우
          // 인증 정보를 제거한다.

          deleteCookie(AUTH_KEY.ACCESS_TOKEN);
          deleteCookie(AUTH_KEY.REFRESH_TOKEN);
          toast.error(AUTH_MESSAGE.REFRESH_ERROR);
          location.replace('/signin');
        });
    }

    isDev && console.error(`요청 에러 ( 에러코드 : ${request?.status} ) `, err);

    return Promise.reject(err);
  },
);

export default axios;
