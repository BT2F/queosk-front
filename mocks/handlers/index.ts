import { userHandler } from '@/mocks/handlers/userHandler';
import { OAuthHandler } from '@/mocks/handlers/OAuthHandler';
import { tokenHandler } from '@/mocks/handlers/tokenHandler';
import { restaurantHandler } from '@/mocks/handlers/restaurantHandler';
import { menuHandler } from '@/mocks/handlers/menuHandler';
import { orderHandler } from '@/mocks/handlers/orderHandler';

export const handlers = [
  ...userHandler,
  ...OAuthHandler,
  ...tokenHandler,
  ...restaurantHandler,
  ...menuHandler,
  ...orderHandler,
];
