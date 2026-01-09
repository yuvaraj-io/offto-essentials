import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/user-auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { user_id } = await getUserFromRequest();

  const [rows] = await db.query(
    `SELECT id, service_type, total_amount, service_status, created_at
     FROM bookings
     WHERE customer_id = ?
     ORDER BY created_at DESC`,
    [user_id]
  );
  console.log(user_id)

  return NextResponse.json({ success: true, data: rows });
}