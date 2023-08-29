import { rest } from 'msw';

type ITable = {
  tableId: number;
  status: 'USING' | 'OPEN';
};

const tableData: ITable = {
  tableId: 1,
  status: 'USING',
};

let tableListData: ITable[] = [
  { tableId: 1, status: 'USING' },
  { tableId: 2, status: 'USING' },
  { tableId: 3, status: 'OPEN' },
  { tableId: 4, status: 'USING' },
  { tableId: 5, status: 'OPEN' },
  { tableId: 6, status: 'OPEN' },
];

export const tablesHandler = [
  // 테이블 추가
  rest.post('/api/restaurant/tables', (req, res, ctx) => {
    // API 문서 작성 안됨
    return res(ctx.status(201));
  }),

  // 테이블 상태 수정
  rest.put('/api/restaurant/table/:id', (req, res, ctx) => {
    const { id } = req.params;
    const tableStatus = req.url.searchParams.get('tableStatus');
    if (!id || !tableStatus) {
      return res(ctx.status(400));
    }

    tableListData = tableListData.map((v) =>
      v.tableId === +id ? { ...v, status: tableStatus as any } : v,
    );

    return res(ctx.status(204));
  }),

  // 테이블 삭제
  rest.delete('/api/restaurant/table/:id', (req, res, ctx) => {
    const { id } = req.params;
    tableListData = tableListData.filter((v) => v.tableId !== +id);

    return res(ctx.status(204));
  }),

  // 테이블 조회
  rest.get('/api/restaurant/table/:id', (req, res, ctx) => {
    const { id } = req.params;
    const targetTable = tableListData.find((v) => v.tableId === +id);

    if (!targetTable) {
      return res(ctx.status(400));
    }

    return res(ctx.status(200), ctx.json(targetTable));
  }),

  // 매장 테이블 현황
  rest.get('/api/restaurant/tables', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tableListData));
  }),
];
