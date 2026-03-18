import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

const publicPaths = ['/admin/login', '/api/auth'];
const protectedPaths = ['/admin', '/api/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TODO: Add CSRF protection when a stable library is available
  // @edge-csrf/nextjs is deprecated - consider alternative implementation

  const isProtected = protectedPaths.some(path => pathname.startsWith(path));
  const isPublic = publicPaths.some(path => pathname.startsWith(path));

  if (isProtected && !isPublic) {
    const session = await auth();

    if (!session) {
      if (!pathname.startsWith('/api/')) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }

      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
