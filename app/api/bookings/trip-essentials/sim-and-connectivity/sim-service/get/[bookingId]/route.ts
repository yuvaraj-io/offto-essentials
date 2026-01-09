import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const { bookingId } = await params;

  const [rows]: any = await db.query(
    `
    SELECT *
    FROM booking_sim_service_details
    WHERE booking_id = ?
    `,
    [bookingId]
  );

  return NextResponse.json({
    success: true,
    data: rows[0] || null
  });
}
