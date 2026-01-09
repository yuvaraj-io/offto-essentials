import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
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
      INSERT INTO business_unavailability (
        id,
        business_profile_id,
        from_date,
        to_date
      ) VALUES (?, ?, ?, ?)
      `,
      [uuidv4(), business_profile_id, from_date, to_date]
    );

    return NextResponse.json({
      success: true,
      message: "Month blocked successfully"
    });
  } catch (err) {
    console.error("[UNAVAILABILITY_BLOCK_MONTH]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
