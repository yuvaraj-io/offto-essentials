// /api/business/offto-verify/status
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const business_profile_id = searchParams.get("business_profile_id");

  if (!business_profile_id) {
    return NextResponse.json(
      { message: "business_profile_id required" },
      { status: 400 }
    );
  }

  const [rows]: any = await db.query(
    `SELECT is_verified
     FROM connectivity_sim_business_profile
     WHERE id = ?
     LIMIT 1`,
    [business_profile_id]
  );

  return NextResponse.json({
    success: true,
    is_verified: !!rows?.[0]?.is_verified
  });
}
