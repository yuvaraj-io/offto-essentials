import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getUserFromRequest } from "@/lib/auth/user-auth";

export async function POST(req: Request) {
  try {
    const { user_id } = await getUserFromRequest();
    const body = await req.json();

   
    const {
      sim_service,
      plan
    } = body;

    if (!sim_service || !plan) {
      return NextResponse.json(
        { message: "Missing booking data" },
        { status: 400 }
      );
    }

    const bookingId = uuidv4();
    const bookingDetailId = uuidv4();

    /* ---------- MAIN BOOKING ---------- */
    await db.query(
      `
      INSERT INTO bookings (
        id,
        customer_id,
        business_profile_id,
        service_type,
        service_status,
        payment_status,
        total_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        bookingId,
        user_id,
        sim_service.business_profile_id,
        "SIM_SERVICE",
        "INITIATED",
        "PAID",
        plan.price
      ]
    );

    /* ---------- SIM SERVICE DETAILS ---------- */
    await db.query(
      `
      INSERT INTO booking_sim_service_details (
        id,
        booking_id,
        sim_service_id,
        sim_plan_id,
        provider_name,
        business_name,
        plan_name,
        sim_name,
        plan_details,
        price,
        e_sim,
        sim_replace_availability,
        activation_time,
        home_delivery_option,
        passport_required,
        aadhar_required,
        photo_required,
        pickup_latitude,
        pickup_longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        bookingDetailId,
        bookingId,
        sim_service.sim_service_id,
        plan.id,
        sim_service.provider_name,
        sim_service.business_name,
        plan.plan_name,
        plan.sim_name,
        plan.details,
        plan.price,
        sim_service.e_sim,
        sim_service.sim_replace_availability,
        sim_service.activation_time,
        sim_service.home_delivery_option,
        sim_service.passport_required,
        sim_service.aadhar_required,
        sim_service.photo_required,
        sim_service.pickup_latitude,
        sim_service.pickup_longitude
      ]
    );

    return NextResponse.json({
      success: true,
      booking_id: bookingId
    });
  } catch (err: any) {
    if (err.message === "NOT_AUTHENTICATED") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    console.error("[SIM_BOOKING]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
