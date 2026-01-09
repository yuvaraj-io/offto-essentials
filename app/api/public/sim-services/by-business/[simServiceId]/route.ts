export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(
  _req: Request,
  context: { params: Promise<{ simServiceId: string }> }
) {
  try {
    // ✅ IMPORTANT FIX
    const { simServiceId } = await context.params;

    /* ---------- SIM SERVICE + BUSINESS ---------- */
    const [serviceRows] = await db.query<RowDataPacket[]>(
      `
      SELECT 
        ss.id AS sim_service_id,
        ss.name AS provider_name,
        ss.e_sim,
        ss.passport_required,
        ss.aadhar_required,
        ss.photo_required,
        ss.activation_time,
        ss.home_delivery_option,
        ss.sim_replace_availability,
        ss.pickup_latitude,
        ss.pickup_longitude,

        bp.id AS business_profile_id,
        bp.name AS business_name,
        bp.address,
        bp.about
      FROM sim_services ss
      JOIN connectivity_sim_business_profile bp
        ON bp.id = ss.connectivity_sim_business_profile_id
      WHERE ss.id = ?
      LIMIT 1
      `,
      [simServiceId]
    );

    if (serviceRows.length === 0) {
      return NextResponse.json(
        { message: "SIM service not found" },
        { status: 404 }
      );
    }

    /* ---------- PLANS ---------- */
    const [planRows] = await db.query<RowDataPacket[]>(
      `
      SELECT
        id,
        plan_name,
        sim_name,
        details,
        price
      FROM tsim_service_plans
      WHERE sim_service_id = ?
      ORDER BY price ASC
      `,
      [simServiceId]
    );

    return NextResponse.json({
      success: true,
      service: serviceRows[0],
      plans: planRows
    });
  } catch (err) {
    console.error("[SIM_SERVICE_BY_ID]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
