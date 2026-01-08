import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessFromRequest } from "@/lib/auth/business-auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { business_login_id } = getBusinessFromRequest(_req);

    const [last]: any = await db.query(
      `SELECT s.business_profile_id, s.to_date
       FROM subscriptions s
       JOIN connectivity_sim_business_profile p
         ON p.id = s.business_profile_id
       WHERE s.id = ?
         AND p.business_login_id = ?
       LIMIT 1`,
      [params.id, business_login_id]
    );
    debugger
    if (last.length === 0) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await db.query(
      `INSERT INTO subscriptions (
        id,
        business_profile_id,
        from_date,
        to_date,
        revenue
      ) VALUES (?, ?, ?, DATE_ADD(?, INTERVAL 1 YEAR), ?)`,
      [
        uuidv4(),
        last[0].business_profile_id,
        last[0].to_date,
        last[0].to_date,
        2500
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Subscription renewed for 1 year"
    });
  } catch (err) {
    console.error("[SUBSCRIPTION_RENEW]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
