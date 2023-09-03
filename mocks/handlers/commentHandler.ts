import { rest } from 'msw';

export const commentHandler = [
  // 리뷰에 댓글 남기기
  rest.post<{ content: string }>(
    '/api/reviews/:id/comments',
    (req, res, ctx) => {
      const { content } = req.body;
      if (!content) {
        return res(ctx.status(400));
      }

      return res(ctx.status(201));
    },
  ),

  // 댓글 수정
  rest.put<{ content: string }>(
    '/api/reviews/comments/:id',
    (req, res, ctx) => {
      // const { id } = req.params;
      const { content } = req.body;
      if (!content) {
        return res(ctx.status(400));
      }

      return res(ctx.status(200));
    },
  ),

  // 댓글 삭제
  rest.delete('/api/reviews/comments/:id', (_req, res, ctx) => {
    return res(ctx.status(204));
  }),

  // 해당 리뷰의 댓글 보기
  rest.get('/api/reviews/:id/comments', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 3,
          content: '제가 무슨 말을 한가죠?',
        },
        {
          id: 4,
          content: '죄송합니다.',
        },
      ]),
    );
  }),
];
