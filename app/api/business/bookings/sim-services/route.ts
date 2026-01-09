import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessFromRequest } from "@/lib/auth/business-auth";

export async function GET(req: Request) {
  try {
    // auth check (who is logged in)
    getBusinessFromRequest(req);

    const { searchParams } = new URL(req.url);
    const businessProfileId = searchParams.get(
      "business_profile_id"
    );

    if (!businessProfileId) {
      return NextResponse.json(
        { message: "business_profile_id required" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      `
      SELECT 
        b.id AS booking_id,
        b.created_at,
        b.service_status,
        b.payment_status,

        d.provider_name,
        d.plan_name,
        d.sim_name,
        d.price,

        u.phone_no AS customer_phone
      FROM bookings b
      JOIN booking_sim_service_details d
        ON d.booking_id = b.id
      JOIN users_login u
        ON u.id = b.customer_id
      WHERE b.business_profile_id = ?
      ORDER BY b.created_at DESC
      `,
      [businessProfileId]
    );

    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error("[BUSINESS_BOOKINGS]", err);
    return NextResponse.json(
      { message: "Unauthorized or server error" },
      { status: 401 }
    );
  }
}
