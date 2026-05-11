import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './app/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const PUBLIC_PATHS = new Set(['/', '/fr', '/en']);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    PUBLIC_PATHS.has(pathname) ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.');

  if (!isPublic) {
    const locale = pathname.startsWith('/fr') ? 'fr' : 'en';
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\..*).*)'
};