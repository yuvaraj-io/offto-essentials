import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessFromRequest } from "@/lib/auth/business-auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { business_login_id } = getBusinessFromRequest(req);
    const { business_profile_id } = await req.json();

    // ownership check
    const [owns]: any = await db.query(
      `SELECT id FROM connectivity_sim_business_profile
       WHERE id = ? AND business_login_id = ?`,
      [business_profile_id, business_login_id]
    );

    if (owns.length === 0) {
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
      ) VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR), ?)`,
      [uuidv4(), business_profile_id, 2500]
    );

    return NextResponse.json({
      success: true,
      message: "Subscription activated for 1 year"
    });
  } catch (err) {
    console.error("[SUBSCRIPTION_CREATE]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
