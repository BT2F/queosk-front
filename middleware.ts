import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AUTH_KEY } from '@/constants/auth';

export function middleware(request: NextRequest) {
  if (!request.cookies.get(AUTH_KEY.ACCESS_TOKEN)) {
    console.log(`비정상 접근이 감지됨 (${request.nextUrl.pathname})`);
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: [
    '/',

    '/account/:path*',

    '/cart/:path*',

    '/mystore/menu/:path*',
    '/mystore/settlement/:path*',
    '/mystore/state/:path*',
    '/mystore/tables/:path*',

    '/payment/:path*',

    '/store/:path*',
  ],
};
