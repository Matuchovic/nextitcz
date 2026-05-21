import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/admin', '/settings', '/profile'];
const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r));
  if (isProtected && !user) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth/callback).*)',
  ],
};
