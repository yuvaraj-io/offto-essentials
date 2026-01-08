import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1️⃣ Get the existing subscription
    const [rows]: any = await db.query(
      `SELECT business_profile_id, to_date
       FROM subscriptions
       WHERE id = ?
       LIMIT 1`,
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 404 }
      );
    }

    const { business_profile_id, to_date } = rows[0];

    // 2️⃣ Insert new subscription (extend by 1 year)
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
        business_profile_id,
        to_date,
        to_date,
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
