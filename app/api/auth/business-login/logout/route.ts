// app/api/auth/business-login/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear auth cookie
  response.cookies.set("business_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/"
  });

  return response;
}
