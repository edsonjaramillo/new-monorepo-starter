import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Middleware for the sign-in page
  const isSignInPath = path.startsWith('/auth/sign-in');
  // If the user is signed in, redirect to the home page
  if (isSignInPath) {
    if (request.cookies.has('session')) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/employee/:path*', '/user/:path*', '/auth/sign-in'],
};
