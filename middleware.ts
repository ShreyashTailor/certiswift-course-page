import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Protect admin routes (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionToken = request.cookies.get('admin-session')?.value
    
    if (!sessionToken) {
      // Redirect to admin login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Basic session validation (in production, use proper JWT validation)
    if (!sessionToken.startsWith('admin_')) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
