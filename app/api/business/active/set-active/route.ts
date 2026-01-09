import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBusinessFromRequest } from "@/lib/auth/business-auth";

export async function POST(req: Request) {
  // ensure user is authenticated
  getBusinessFromRequest(req);

  const { business_id } = await req.json();

  if (!business_id) {
    return NextResponse.json(
      { message: "business_id is required" },
      { status: 400 }
    );
  }
  const cookieData = await cookies();
  cookieData.set("active_business_id", business_id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return NextResponse.json({ success: true });
}
