import { userHandler } from '@/mocks/handlers/userHandler';
import { OAuthHandler } from '@/mocks/handlers/OAuthHandler';

export const handlers = [...userHandler, ...OAuthHandler];
