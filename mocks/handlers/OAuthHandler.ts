import { rest } from 'msw';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';

export const OAuthHandler = [
  // 로그인 요청시 카카오 로그인 페이지로 연결
  rest.get('/api/kakao/signin', (req, res, ctx) => {
    return res(
      ctx.status(300),
      ctx.set(
        'Location',
        `https://kauth.kakao.com/oauth/authorize?client_id=${
          process.env.NEXT_PUBLIC_KAKAO_CLIENT || ''
        }&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code`,
      ),
    );
  }),

  // 카카오 소셜 로그인 코드를 이용하여 로그인 진행

  rest.post<{ code: string }>('/api/kakao/signin', (req, res, ctx) => {
    const { code } = req.body;
    if (!code) {
      return res(ctx.status(400));
    }
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        email: 'user@exmpl.com',
        nickname: '아기상어',
        imageUrl: placeholderImgUrl('100x100'),
        loginType: 'KAKAO',
      }),
    );
  }),
];
