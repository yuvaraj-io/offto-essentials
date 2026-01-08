import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { business_profile_id, from_date, to_date, revenue } =
      await req.json();

    if (!business_profile_id || !from_date || !to_date || !revenue) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const id = uuidv4();

    await db.query(
      `INSERT INTO subscriptions
       (id, business_profile_id, from_date, to_date, revenue)
       VALUES (?, ?, ?, ?, ?)`,
      [id, business_profile_id, from_date, to_date, revenue]
    );

    return NextResponse.json({
      success: true,
      id,
      message: "Subscription created"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
