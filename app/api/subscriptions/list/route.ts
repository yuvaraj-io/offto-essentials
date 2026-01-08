import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface SubscriptionRow extends RowDataPacket {
  id: string;
  from_date: string;
  to_date: string;
  revenue: number;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const business_profile_id = searchParams.get("business_profile_id");

    if (!business_profile_id) {
      return NextResponse.json(
        { success: false, message: "business_profile_id required" },
        { status: 400 }
      );
    }

    const [rows] = await db.query<SubscriptionRow[]>(
      `SELECT id, from_date, to_date, revenue
       FROM subscriptions
       WHERE business_profile_id = ?
       ORDER BY from_date DESC`,
      [business_profile_id]
    );

    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error("[SUBSCRIPTION_LIST]", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
