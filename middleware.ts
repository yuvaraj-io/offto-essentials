import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
  const token = req.cookies.get("business_token")?.value;

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/business/trip-essentials");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL("/auth/business-login", req.url)
    );
  }

  return NextResponse.next();
}
