import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { business_profile_id } = await req.json();

    if (!business_profile_id) {
      return NextResponse.json(
        { message: "business_profile_id is required" },
        { status: 400 }
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
