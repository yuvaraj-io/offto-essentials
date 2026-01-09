import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface UnavailabilityRow extends RowDataPacket {
  id: string;
  from_date: string;
  to_date: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const business_profile_id = searchParams.get("business_profile_id");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!business_profile_id || !from || !to) {
      return NextResponse.json(
        { message: "Missing required query params" },
        { status: 400 }
      );
    }

    const [rows] = await db.query<UnavailabilityRow[]>(
      `
      SELECT id, from_date, to_date
      FROM business_unavailability
      WHERE business_profile_id = ?
        AND from_date <= ?
        AND to_date >= ?
      `,
      [business_profile_id, to, from]
    );

    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error("[UNAVAILABILITY_LIST]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
