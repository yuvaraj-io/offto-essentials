import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      business_profile_id,
      from_date,
      to_date
    } = body;

    if (!business_profile_id || !from_date || !to_date) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

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
      message: "Date blocked successfully"
    });
  } catch (err) {
    console.error("[UNAVAILABILITY_CREATE]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
