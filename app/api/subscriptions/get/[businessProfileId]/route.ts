import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessFromRequest } from "@/lib/auth/business-auth";
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
    const { business_login_id } = getBusinessFromRequest(_req);

    // verify ownership
    const [ownership]: any = await db.query(
      `SELECT id FROM connectivity_sim_business_profile
       WHERE id = ? AND business_login_id = ?`,
      [params.businessProfileId, business_login_id]
    );

    if (ownership.length === 0) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

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
    console.error("[SUBSCRIPTION_GET]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
