import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const business_profile_id = searchParams.get("business_profile_id");

    if (!business_profile_id) {
      return NextResponse.json(
        { message: "business_profile_id required" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      `SELECT inclusions, exclusions
       FROM business_inclusion_exclusion
       WHERE business_profile_id = ?
       LIMIT 1`,
      [business_profile_id]
    );

    return NextResponse.json({
      success: true,
      data: rows[0] || null
    });
  } catch (err) {
    console.error("[INCLUSION_GET]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
