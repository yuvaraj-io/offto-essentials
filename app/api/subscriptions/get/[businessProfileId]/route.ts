import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface SubscriptionRow extends RowDataPacket {
  from_date: string;
  to_date: string;
}

export async function GET(
  _req: Request,
  { params }: { params: { businessProfileId: string } }
) {
  try {
    const [rows] = await db.query<SubscriptionRow[]>(
      `SELECT from_date, to_date
       FROM subscriptions
       WHERE business_profile_id = ?
         AND CURDATE() BETWEEN from_date AND to_date
       LIMIT 1`,
      [params.businessProfileId]
    );

    return NextResponse.json({
      success: true,
      is_subscribed: rows.length > 0,
      subscription: rows[0] || null
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
