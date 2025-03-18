import { NextResponse } from "next/server";
import { auth } from "@/lib";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (!isAuthenticated && !isAuthRoute) {
    const route = new URL("/auth", nextUrl);

    return NextResponse.redirect(route);
  }

  if (isAuthenticated && isAuthRoute) {
    const route = new URL("/", nextUrl);

    const paramsStep = nextUrl.searchParams.get("step");
    // Omit the profile select route
    if (!paramsStep) {
      return NextResponse.redirect(route);
    }
  }
});
