import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const PUBLIC_ROUTES = ['/login', '/register'];
const COOKIE_NAME = 'todo_session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const isPublic = PUBLIC_ROUTES.some(r => pathname.startsWith(r));

  if (isPublic) {
    if (token) {
      const payload = await verifyToken(token);
      if (payload) return NextResponse.redirect(new URL('/todos', req.url));
    }
    return NextResponse.next();
  }

  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  const payload = await verifyToken(token);
  if (!payload) {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
