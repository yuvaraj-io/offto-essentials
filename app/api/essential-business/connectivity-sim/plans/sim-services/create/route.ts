import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const connection = await db.getConnection();

  try {
    const body = await req.json();

    const {
      connectivity_sim_business_profile_id,
      name,
      e_sim,
      passport_required,
      aadhar_required,
      photo_required,
      activation_time,
      home_delivery_option,
      pickup_latitude,
      pickup_longitude,
      sim_replace_availability,
      plans
    } = body;

    /* ---------- VALIDATION ---------- */
    if (!connectivity_sim_business_profile_id || !name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!Array.isArray(plans) || plans.length === 0) {
      return NextResponse.json(
        { message: "At least one plan is required" },
        { status: 400 }
      );
    }

    for (const plan of plans) {
      if (
        !plan.plan_name ||
        !plan.sim_name ||
        !plan.details ||
        plan.price === undefined
      ) {
        return NextResponse.json(
          { message: "All plan fields are mandatory" },
          { status: 400 }
        );
      }
    }

    /* ---------- TRANSACTION START ---------- */
    await connection.beginTransaction();

    const simServiceId = uuidv4();

    /* ---------- INSERT SIM SERVICE ---------- */
    await connection.query(
      `INSERT INTO sim_services (
        id,
        connectivity_sim_business_profile_id,
        name,
        e_sim,
        passport_required,
        aadhar_required,
        photo_required,
        activation_time,
        home_delivery_option,
        pickup_latitude,
        pickup_longitude,
        sim_replace_availability
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        simServiceId,
        connectivity_sim_business_profile_id,
        name,
        e_sim ? 1 : 0,
        passport_required ? 1 : 0,
        aadhar_required ? 1 : 0,
        photo_required ? 1 : 0,
        activation_time,
        home_delivery_option ? 1 : 0,
        pickup_latitude,
        pickup_longitude,
        sim_replace_availability ? 1 : 0
      ]
    );

    /* ---------- INSERT PLANS ---------- */
    for (const plan of plans) {
      await connection.query(
        `INSERT INTO sim_service_plans (
          id,
          sim_service_id,
          plan_name,
          sim_name,
          details,
          price
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          uuidv4(),
          simServiceId,
          plan.plan_name,
          plan.sim_name,
          plan.details,
          plan.price
        ]
      );
    }

    /* ---------- COMMIT ---------- */
    await connection.commit();

    return NextResponse.json({
      success: true,
      sim_service_id: simServiceId,
      message: "SIM service and plans created successfully"
    });
  } catch (err) {
    await connection.rollback();
    console.error("[SIM_SERVICE_CREATE]", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
