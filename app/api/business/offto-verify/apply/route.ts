// /api/business/offto-verify/apply
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { business_profile_id } = await req.json();

  if (!business_profile_id) {
    return NextResponse.json(
      { message: "business_profile_id required" },
      { status: 400 }
    );
  }

  await db.query(
    `UPDATE connectivity_sim_business_profile
     SET is_verified = 1
     WHERE id = ?`,
    [business_profile_id]
  );

  return NextResponse.json({
    success: true,
    message: "Business verified successfully"
  });
}
