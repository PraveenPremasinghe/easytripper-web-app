import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check for session token in cookies (NextAuth v5 uses different cookie names)
  const cookies = request.cookies.getAll();
  const hasSession = cookies.some(
    (cookie) =>
      cookie.name.includes("authjs.session-token") ||
      cookie.name.includes("next-auth.session-token") ||
      cookie.name.includes("__Secure-authjs.session-token") ||
      cookie.name.includes("__Secure-next-auth.session-token")
  );

  // Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    if (!hasSession) {
      // Redirect to login if no session token
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

