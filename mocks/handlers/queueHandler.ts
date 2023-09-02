import { rest } from 'msw';

const queueData = {
  userQueueIndex: 2,
  queueRemaining: 1,
};

const queueListData = {
  totalQueue: 3,
  queueDtoList: [
    {
      id: 46,
      numberOfParty: 2,
      userId: 1,
      restaurantId: 1,
    },
    {
      id: 47,
      numberOfParty: 2,
      userId: 2,
      restaurantId: 1,
    },
  ],
};

export const queueHandler = [
  // 매장 웨이팅 등록 ( 유저 )
  rest.post<{ numberOfParty: number }>(
    '/api/restaurants/:id/queue',
    (req, res, ctx) => {
      const { numberOfParty } = req.body;

      return res(ctx.status(201), ctx.json(queueData));
    },
  ),

  // 유저 본인의 웨이팅 순서 확인 ( 유저 )
  rest.get('/api/restaurants/:id/user/queue', (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json(queueData));
  }),

  // 매장 웨이팅 취소 ( 유저 )
  rest.delete('/api/restaurants/queue', (_req, res, ctx) => {
    return res(ctx.status(204));
  }),

  // 웨이팅 팀 수 및 팀 정보 확인 ( 매장 )
  rest.get('/api/restaurants/queue', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(queueListData));
  }),

  // 웨이팅 당기기 ( 매장 )
  rest.delete('/api/restaurants/queue', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(queueListData));
  }),
];
