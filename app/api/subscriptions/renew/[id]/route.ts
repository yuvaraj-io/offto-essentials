import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { from_date, to_date, revenue } = await req.json();

    await db.query(
      `UPDATE subscriptions
       SET from_date = ?, to_date = ?, revenue = ?
       WHERE id = ?`,
      [from_date, to_date, revenue, params.id]
    );

    return NextResponse.json({
      success: true,
      message: "Subscription renewed"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
