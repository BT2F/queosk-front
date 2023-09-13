const storeListRes = {
  email: 'admin@email.com',
  phone: '01012341234',
  restaurantPhone: '0212341234',
  restaurantName: '테스트식당이름-0',
  nickName: 'admin',
  imageUrl: 'https://placehold.co/100x100',
  category: 'ASIAN',
  ownerName: 'admin',
  id: 1,
  ownerId: 'test2',
  businessNumber: '123-45-67890',
  businessStartDate: '1990-04-28T00:00:00.000+00:00',
  address: '세종로 81-4',
  ratingAverage: '3.4',
  operationStatus: 'CLOSED',
  maxWaiting: 10,
  region: '사직동',
};

export type IStoreRes = typeof storeListRes;

const menuListRes = {
  id: 2,
  restaurantId: 6,
  name: '만둣국',
  imageUrl: 'string',
  price: 8000,
  status: 'ON_SALE',
};

export type IMenuRes = typeof menuListRes;
