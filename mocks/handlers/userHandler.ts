import { rest } from 'msw';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';

const userData = {
  password: '123123123a!',
  email: 'test@email.com',
  nickName: 'test',
  imageUrl: placeholderImgUrl('100x100'),
  loginType: 'NORMAL',
};

export const userHandler = [
  // 고객 회원 가입
  rest.post<{
    email: string;
    password: string;
    nickName: string;
  }>('/api/users/signup', (req, res, ctx) => {
    const { email, password, nickName } = req.body;
    let status = 201;

    if (!(email && password && nickName)) {
      status = 400;
    }

    return res(ctx.status(status));
  }),

  // 회원가입후 전송된 이메일 ?
  rest.get('api/users/:id/verification', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: '정상적으로 인증된 사용자입니다.' }),
    );
  }),

  // 이미지 업로드
  rest.post('/api/users/image', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        imgUrl: placeholderImgUrl('100x100'),
      }),
    );
  }),
  // 이메일 중복 확인
  rest.post<{ email: string }>('/api/users/check', (req, res, ctx) => {
    const { email } = req.body;
    let status = 200;
    let message = '사용 가능한 이메일 입니다.';

    if (email === userData.email) {
      status = 400;
      message = '이미 사용중인 이메일 입니다.';
    }

    return res(
      ctx.status(status),
      ctx.json({
        message,
      }),
    );
  }),

  // 고객 로그인
  rest.post<{ email: string; password: string }>(
    '/api/users/signin',
    (req, res, ctx) => {
      const { email, password } = req.body;

      if (!(email === userData.email && password === userData.password)) {
        return res(ctx.status(400));
      }

      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
          email: 'test@email.com',
          nickName: 'test',
          imageUrl: placeholderImgUrl('100x100'),
          loginType: 'NORMAL',
        }),
      );
    },
  ),
  // 고객 로그아웃
  rest.post('/api/users/signout', (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  // 회원 상세 보기
  rest.get('api/users', (req, res, ctx) => {
    //인증 과정은 생략합니다.
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        email: 'test@email.com',
        nickName: 'test',
        phone: '01012341234',
        status: 'verified',
        imageUrl: placeholderImgUrl('100x100'),
        updatedAt: '2023-09-11',
        createdAt: '2023-09-09',
      }),
    );
  }),

  //회원정보 수정
  rest.put<{}>('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        email: 'test@email.com',
        nickName: 'test',
        phone: '01012341234',
        status: 'verified',
        imageUrl: placeholderImgUrl('100x100'),
        updatedAt: '2023-09-11',
        createdAt: '2023-09-09',
        ...req.body,
      }),
    );
  }),

  rest.delete('/api/users', (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.post<{ email: string; nickName: string }>(
    '/api/users/password/reset',
    (req, res, ctx) => {
      const { email, nickName } = req.body;
      if (email !== userData.email || nickName !== userData.nickName) {
        return res(ctx.status(400));
      }
      return res(ctx.status(200), ctx.json({ message: '이메일로 전송 로직' }));
    },
  ),

  rest.put<{ existingPassword: string; newPassword: string }>(
    '/api/users/password/change',
    (req, res, ctx) => {
      const { existingPassword, newPassword } = req.body;
      if (!(existingPassword === userData.password && !!newPassword)) {
        return res(ctx.status(400));
      }
      return res(ctx.status(204));
    },
  ),
];
