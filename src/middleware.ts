import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED = ['/dashboard', '/admin', '/settings', '/profile'];
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED.some(r => pathname.startsWith(r));
  const isAuth = AUTH_ROUTES.some(r => pathname.startsWith(r));

  if (!isProtected && !isAuth) return response;

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options as Record<string, unknown>)
            );
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (isProtected && !session) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

    if (isAuth && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } catch {
    if (isProtected) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
