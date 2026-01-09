import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const {
      business_profile_id,
      year,
      month
    } = body;

    if (!business_profile_id || !year || !month) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const from_date = `${year}-${String(month).padStart(2, "0")}-01`;
    const to_date = new Date(year, month, 0)
      .toISOString()
      .slice(0, 10);

    await db.query(
      `
      DELETE FROM business_unavailability
      WHERE business_profile_id = ?
        AND from_date <= ?
        AND to_date >= ?
      `,
      [business_profile_id, to_date, from_date]
    );

    return NextResponse.json({
      success: true,
      message: "Month unblocked successfully"
    });
  } catch (err) {
    console.error("[UNAVAILABILITY_UNBLOCK_MONTH]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
