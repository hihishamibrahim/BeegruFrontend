import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('middleware',request.url)
  // Get the token from cookies
  const token = request.cookies.get('accessToken');
  const isAuthenticated = !!token;
  const { pathname } = request.nextUrl;

  // If user is authenticated and tries to access login page
  
  // If user is not authenticated and tries to access protected routes
  if (!isAuthenticated && !pathname.startsWith('/auth')) return NextResponse.redirect(new URL('/auth/login', request.url));
  if (isAuthenticated && (pathname.startsWith('/auth') || pathname.startsWith('/') || pathname.startsWith('/*'))) return NextResponse.next(); 
}

export const config = {
  matcher: [
    '/',
  ]
}
