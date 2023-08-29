import { rest } from 'msw';

const responseData = {
  orderdMenu: [
    {
      menu: '짬뽕',
      count: 2,
      price: 10000,
    },
    {
      menu: '짜장면',
      count: 2,
      price: 8000,
    },
  ],
  price: 36000,
};

export const settlementHandler = [
  // 금일 매출 확인
  rest.get('/api/restaurants/settlement/today', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseData));
  }),

  // 기간별 매출 확인
  rest.get('/api/restaurants/settlement/period', (req, res, ctx) => {
    const from = req.url.searchParams.get('from') || '2023-08-21';
    const to = req.url.searchParams.get('to') || '2023-08-27';

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return res(
      ctx.status(200),
      ctx.json({
        orderdMenu: [
          responseData.orderdMenu.map((v) => ({
            ...v,
            count: v.count * diffDays,
          })),
        ],
        price: responseData.price * diffDays,
      }),
    );
  }),
];
