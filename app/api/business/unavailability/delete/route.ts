import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const {
      business_profile_id,
      date
    } = body;

    if (!business_profile_id || !date) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      `
      DELETE FROM business_unavailability
      WHERE business_profile_id = ?
        AND from_date = ?
        AND to_date = ?
      `,
      [business_profile_id, date, date]
    );

    return NextResponse.json({
      success: true,
      message: "Date unblocked successfully"
    });
  } catch (err) {
    console.error("[UNAVAILABILITY_DELETE]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
