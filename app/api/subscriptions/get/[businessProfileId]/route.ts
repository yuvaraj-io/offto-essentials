export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface SubscriptionRow extends RowDataPacket {
  from_date: string;
  to_date: string;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ businessProfileId: string }> }
) {
  try {
    // ✅ unwrap params (THIS IS THE FIX)
    const { businessProfileId } = await context.params;

    const [rows] = await db.query<SubscriptionRow[]>(
      `SELECT from_date, to_date
       FROM subscriptions
       WHERE business_profile_id = ?
         AND CURDATE() >= from_date
         AND CURDATE() < DATE_ADD(to_date, INTERVAL 1 DAY)
       LIMIT 1`,
      [businessProfileId]
    );

    return NextResponse.json({
      success: true,
      is_subscribed: rows.length > 0,
      subscription: rows[0] ?? null
    });
  } catch (err) {
    console.error("[SUBSCRIPTION_GET]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
