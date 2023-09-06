import { rest } from 'msw';

export const reviewHandler = [
  // 리뷰 남기기
  rest.post<{
    restaurantId: number;
    subject: string;
    content: string;
    rate: string;
  }>('/api/reviews', (req, res, ctx) => {
    const { restaurantId, subject, content, rate } = req.body;
    if (!(restaurantId && subject && content && rate)) {
      return res(ctx.status(400));
    }
    return res(ctx.status(201));
  }),

  // 리뷰 열람
  rest.get('/api/reviews/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),

  // 리뷰 삭제
  rest.delete('/api/reviews/:id', (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.status(204));
  }),

  // 리뷰 수정
  rest.put<{ subject: string; content: string; rate: string }>(
    '/api/reviews/:id',
    (req, res, ctx) => {
      const { id } = req.params;
      const { subject, content, rate } = req.body;

      if (!(subject && content && rate)) {
        return res(ctx.status(400));
      }

      return res(
        ctx.status(200),
        ctx.json({
          id: 4,
          restaurant: {
            id: 1,
            ownerId: 'test2',
            ownerName: 'test2',
            email: 'a5@x.com',
            phone: null,
            restaurantName: '테스트네 식당',
            restaurantPhone: '0101234567',
            category: 'ASIAN',
            businessNumber: '123-45-67890',
            businessStartDate: '1990-04-27T15:00:00.000+00:00',
            address: '세종로 81-4',
            ratingAverage: null,
            imageUrl: null,
            operationStatus: 'CLOSED',
            maxWaiting: null,
            region: '사직동',
          },
          user: {
            id: 1,
            nickName: '김길동',
            email: 'a@b.com',
            phone: '01098980000',
            status: 'VERIFIED',
            imageUrl: null,
            loginType: 'NORMAL',
            createdAt: '2023-08-27T12:12:01.818485',
            updatedAt: '2023-08-27T12:12:27.872197',
          },
          subject: '꿀맛',
          content: '맛있음',
          rate: 5.0,
        }),
      );
    },
  ),

  // 사용자가 작성한 리뷰 보기
  rest.get('/api/reviews/restaurant/:id/user', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 4,
          restaurant: {
            id: 1,
            ownerId: 'test2',
            ownerName: 'test2',
            email: 'a5@x.com',
            phone: null,
            restaurantName: '테스트네 식당',
            restaurantPhone: '0101234567',
            category: 'ASIAN',
            businessNumber: '123-45-67890',
            businessStartDate: '1990-04-27T15:00:00.000+00:00',
            address: '세종로 81-4',
            ratingAverage: null,
            imageUrl: null,
            operationStatus: 'CLOSED',
            maxWaiting: null,
            region: '사직동',
          },
          user: {
            id: 1,
            nickName: '김길동',
            email: '',
            phone: '01000000000',
            status: 'VERIFIED',
            imageUrl: null,
            loginType: 'NORMAL',
            createdAt: '2023-08-27T12:12:01.818485',
            updatedAt: '2023-08-27T12:12:27.872197',
          },
          subject: '꿀맛',
          content: '맛있음',
          rate: 5.0,
        },
        {
          id: 5,
          restaurant: {
            id: 1,
            ownerId: 'test2',
            ownerName: 'test2',
            email: 'a5@x.com',
            phone: null,
            restaurantName: '테스트네 식당',
            restaurantPhone: '0101234567',
            category: 'ASIAN',
            businessNumber: '123-45-67890',
            businessStartDate: '1990-04-27T15:00:00.000+00:00',
            address: '세종로 81-4',
            ratingAverage: null,
            imageUrl: null,
            operationStatus: 'CLOSED',
            maxWaiting: null,
            region: '사직동',
          },
          user: {
            id: 1,
            nickName: '고길동',
            email: '',
            phone: '01000000000',
            status: 'VERIFIED',
            imageUrl: null,
            loginType: 'NORMAL',
            createdAt: '2023-08-27T12:12:01.818485',
            updatedAt: '2023-08-27T12:12:27.872197',
          },
          subject: '노맛',
          content: '맛없음',
          rate: 2.7,
        },
      ]),
    );
  }),

  // 매장 리뷰 리스트 보기
  rest.get('/api/reviews/restaurants/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: '아직 지정 되지 않은 매장 리뷰 정보 전달 예정' }),
    );
  }),
];
