import { rest } from 'msw';

export const orderHandler = [
  // 주문 등록
  rest.post('/api/user/order', (req, res, ctx) => {
    // API 명세에 작성된 내용이 없음
    return res(ctx.status(201));
  }),

  // 주문 상태 수정
  rest.put('/api/restaurant/order/:id', (req, res, ctx) => {
    // API 명세에 작성된 내용이 없음
    return res(ctx.status(204));
  }),

  // 상점에서 단일 주문 확인
  rest.get('/api/restaurant/order/:id', (req, res, ctx) => {
    // API 명세에 작성된 내용이 없음
    return res(
      ctx.status(200),
      ctx.json({
        orderId: 1,
        orderStatus: 'IN_PROGRESS',
        count: 1,
      }),
    );
  }),

  // 상점에서 금일 주문 리스트 확인
  rest.get('/api/restaurant/orders/today', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          tableId: 1,
          orderStatus: 'DONE',
          count: 1,
        },
        {
          tableId: 2,
          orderStatus: 'CANCELED',
          count: 4,
        },
        {
          tableId: 1,
          orderStatus: 'DONE',
          count: 1,
        },
      ]),
    );
  }),

  // 상점에서 주문 처리중 리스트 확인
  rest.get('/api/restaurant/orders/in-progress', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ tableId: 1, orderStatus: 'IN_PROGRESS', count: 1 }]),
    );
  }),
];
