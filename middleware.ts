import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decode, JwtPayload} from 'jsonwebtoken'

// Helper function to verify JWT token
function verifyToken(token: string): string | JwtPayload | null {
  try {
    return decode(token);
  } catch {
    return null
  }
}

// Helper function to extract token from Authorization header
function extractTokenFromHeader(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.split(' ')[1]
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define public paths that don't require authentication
  const isPublicPath = pathname.startsWith('/auth/') || 
                      pathname === '/api/auth/login' || 
                      pathname === '/api/auth/register' || 
                      pathname.startsWith('/api/public/')

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Handle API routes
  if (pathname.startsWith('/api')) {
    const token = extractTokenFromHeader(request)
    
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Add user info to request headers for API routes
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify(decoded))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Handle page routes - still using cookies for pages
  const token = request.cookies.get('token')?.value
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Verify token for pages
  const decoded = verifyToken(token)
  if (!decoded) {
    const loginUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}