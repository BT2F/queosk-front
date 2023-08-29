import { rest } from 'msw';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';

let currentId = 3;
const menuData = {
  id: 1,
  restaurantId: 1,
  name: '짜장면',
  imageUrl: placeholderImgUrl('100x100'),
  price: 7000,
  status: 'ON_SALE',
};

let menuListData: (typeof menuData)[] = [
  {
    id: 1,
    restaurantId: 1,
    name: '짜장면',
    imageUrl: placeholderImgUrl('100x100'),
    price: 7000,
    status: 'ON_SALE',
  },
  {
    id: 2,
    restaurantId: 1,
    name: '냉면',
    imageUrl: placeholderImgUrl('100x100'),
    price: 8000,
    status: 'SOLD_OUT',
  },
];

export const menuHandler = [
  // 식당 메뉴 목록 조회
  rest.get('/api/restaurant/:id/menus', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(menuListData));
  }),
  // 메뉴 이미지 업로드 후 URL 가져오기
  rest.post('/api/restaurant/menus/image', (_req, res, ctx) => {
    return res(ctx.status(201));
  }),

  // 식당 메뉴 목록 추가
  rest.post<{ imageUrl: string; name: string; price: number }>(
    '/api/restaurant/menus',
    (req, res, ctx) => {
      const { imageUrl, name, price } = req.body;
      if (!(imageUrl && name && price)) {
        return res(ctx.status(400));
      }

      menuListData.push({
        id: currentId++,
        imageUrl,
        name,
        price,
        restaurantId: 1,
        status: 'ON_SALE',
      });

      return res(ctx.status(201));
    },
  ),

  // 식당 메뉴 목록 수정
  rest.put<{ name?: string; price?: number; status?: string }>(
    '/api/restaurant/menus/:id',
    (req, res, ctx) => {
      const { id } = req.params;
      const { name, price, status } = req.body;

      const targetMenu = menuListData.find((v) => v.id === +id);

      //메뉴가 없을때
      if (!targetMenu) {
        return res(ctx.status(400));
      }

      const fixedMenu: typeof menuData = {
        ...targetMenu,
        name: name || targetMenu.name,
        price: price || targetMenu.price,
        status: status || targetMenu.status,
      };

      // 메뉴 리스트 데이터 수정
      menuListData = menuListData.map((v) => (v.id === +id ? fixedMenu : v));
      // API 문서 기준 코드 204 ?
      return res(ctx.status(204));
    },
  ),

  // 메뉴 이미지 수정
  rest.put('/api/restaurant/menus/:id/image', (req, res, ctx) => {
    // API 문서 기준 코드 204 ?
    return res(ctx.status(204));
  }),

  // 메뉴 주문가능여부 상태 수정
  rest.put<{ status: string }>(
    '/api/restaurant/menus/:id/status',
    (req, res, ctx) => {
      const { id } = req.params;
      const { status } = req.body;
      const targetMenu = menuListData.find((v) => v.id === +id);

      if (!targetMenu || !status) {
        return res(ctx.status(400));
      }

      menuListData = menuListData.map((v) =>
        v.id === +id ? { ...v, status } : v,
      );

      // API 문서 기준 코드 204 ?
      return res(ctx.status(204));
    },
  ),

  // 메뉴 삭제
  rest.delete('/api/restaurant/menus/:id', (req, res, ctx) => {
    const { id } = req.params;
    menuListData = menuListData.filter((v) => v.id !== +id);

    return res(ctx.status(204));
  }),
];
