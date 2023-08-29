import { rest } from 'msw';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';

let restaurantData = {
  email: 'admin@email.com',
  phone: '01012341234',
  restaurantPhone: '0212341234',
  restaurantName: '테스트식당이름',
  nickName: 'admin',
  imageUrl: placeholderImgUrl('100x100'),
  category: 'ASIAN',
};

export const restaurantHandler = [
  // 사업자 회원 가입
  rest.post<{
    ownerId: string;
    ownerName: string;
    password: string;
    email: string;
    phone: string;
    restaurantPhone: string;
    restaurantName: string;
    category: string;
    businessNumber: string;
    businessStartDate: string;
    address: string;
  }>('/api/restaurant/signup', (req, res, ctx) => {
    const {
      ownerId,
      ownerName,
      password,
      email,
      phone,
      restaurantPhone,
      restaurantName,
      category,
      businessNumber,
      businessStartDate,
      address,
    } = req.body;

    if (
      !(
        ownerId &&
        ownerName &&
        password &&
        email &&
        phone &&
        restaurantPhone &&
        restaurantName &&
        category &&
        businessNumber &&
        businessStartDate &&
        address
      )
    ) {
      return res(ctx.status(400));
    }
    return res(ctx.status(201));
  }),

  // 사업자 로그인
  rest.post<{ id: string; password: string }>(
    '/api/restaurant/signin',
    (req, res, ctx) => {
      const { id, password } = req.body;
      if (!(id === 'admin@email.com' && password === '123123123a!')) {
        return res(ctx.status(400));
      }

      return res(
        ctx.status(200),
        ctx.json({
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
          email: restaurantData.email,
          nickName: restaurantData.nickName,
          imageUrl: restaurantData.imageUrl,
        }),
      );
    },
  ),

  // 사업자 이미지 업로드 ( 추후 formdata로 변경 필요 )

  rest.post<{ image: string }>('/api/restaurant/image', (req, res, ctx) => {
    const { image } = req.body;
    if (!image) {
      return res(ctx.status(400));
    }
    return res(ctx.status(201));
  }),

  // 사업자 로그아웃

  rest.post('/api/restaurant/signout', (req, res, ctx) => {
    const accessToken = req.headers.get('authorization');
    if (accessToken !== 'accessToken') {
      return res(ctx.status(401));
    }
    return res(ctx.status(204));
  }),

  // 사업자 임시 비밀번호 발급
  rest.post<{ email: string; ownerName: string }>(
    '/api/user/resetpassword',
    (req, res, ctx) => {
      const { email, ownerName } = req.body;

      if (email === 'admin@email.com' && ownerName === 'admin') {
        return res(ctx.status(204)); // ? 코드 204..?
      }
      return res(ctx.status(400));
    },
  ),

  // 매장 정보 확인
  rest.get('/api/restaurant', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(restaurantData));
  }),

  // 매장 정보 수정
  rest.put<Object>('/api/restaurant', (req, res, ctx) => {
    const body = req.body;
    restaurantData = { ...restaurantData, ...body };

    return res(ctx.status(201), ctx.json(restaurantData));
  }),

  // 매장 정보 삭제
  rest.delete('/api/restaurant', (req, res, ctx) => {
    if (req.headers.get('authorization') !== 'accessToken') {
      return res(ctx.status(401));
    }
    // Msw에서는 동작만 존재함
    return res(ctx.status(204));
  }),

  // 매장 조회
  rest.get('/api/restaurant/coord', (req, res, ctx) => {
    const { size, page } = req.params;

    const data = Array.from({ length: +size }, (_, i) => ({
      ...restaurantData,
      restaurantName: `${restaurantData.restaurantName}-${i + +page * +size}`,
    }));

    return res(ctx.status(200), ctx.json(data));
  }),

  // 매장 상세 보기
  rest.get('/api/restaurant/:id', (req, res, ctx) => {
    // 매장 상세보기에 대한 API response 문서가 아직 작성되어 있지 않음
    return res(ctx.status(200), ctx.json(restaurantData));
  }),
];
