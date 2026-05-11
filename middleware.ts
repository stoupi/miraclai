import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './app/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const LANDING_ONLY = /^\/(fr|en)?\/?$/;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!LANDING_ONLY.test(pathname)) {
    const locale = pathname.startsWith('/fr') ? 'fr' : 'en';
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(fr|en)/:path*']
};