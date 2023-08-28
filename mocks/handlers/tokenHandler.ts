import { rest } from 'msw';

export const tokenHandler = [
  // 현재 Url이 변경중인 관계로 임시로 작성했습니다.
  rest.post('/api/auth/refresh', (req, res, ctx) => {
    const refreshToken = req.headers.get('authorization');
    if (refreshToken !== 'refreshToken') {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({
        accessToken: 'accessToken',
      }),
    );
  }),
];
