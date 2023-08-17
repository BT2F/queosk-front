import { default as axiosDefault } from 'axios';
import { AUTH_KEY, AUTH_MESSAGE } from '@/constants/auth';
import { toast } from 'react-toastify';

const axios = axiosDefault.create();

const isDev = process.env.NODE_ENV === 'development';
// 요청 인터셉터
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem(
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
      localStorage.setItem(AUTH_KEY.ACCESS_TOKEN, res.data.accessToken);
      localStorage.setItem(AUTH_KEY.REFRESH_TOKEN, res.data.refreshToken);
    }
    return res;
  },
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    if (status === 401) {
      // 비 인증 상태 일때
      const target = config.url.includes('restaurant') ? 'restaurant' : 'user';
      return await axios
        .post(
          `/api/${target}/access-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                AUTH_KEY.REFRESH_TOKEN,
              )}`,
            },
          },
        )
        .then((res) => {
          // 비인증 상태에서 성공적으로 토큰이 갱신된 경우
          // 인증 정보를 저정한 이후 다시 요청을 보낸다.
          localStorage.setItem(AUTH_KEY.ACCESS_TOKEN, res.data.accessToken);

          config.headers.Authorization = `Bearer ${res.data.accessToken}`;

          return axios(config);
        })
        .catch(() => {
          // 비인증 상태에서 요청이 반려된 경우
          // 인증 정보를 제거한다.
          localStorage.removeItem(AUTH_KEY.ACCESS_TOKEN);
          localStorage.removeItem(AUTH_KEY.REFRESH_TOKEN);

          toast.error(AUTH_MESSAGE.REFRESH_ERROR);
        });
    }

    isDev && console.error(`요청 에러 ( 에러코드 : ${status} ) `, err);

    return Promise.reject(err);
  },
);

export default axios;
