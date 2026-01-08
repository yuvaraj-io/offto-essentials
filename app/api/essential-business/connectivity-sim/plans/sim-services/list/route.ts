import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface ServiceRow extends RowDataPacket {
  service_id: string;
  service_name: string;
  e_sim: number;
  activation_time: string | null;
  home_delivery_option: number;
}

interface PlanRow extends RowDataPacket {
  id: string;
  sim_service_id: string;
  plan_name: string;
  sim_name: string;
  details: string;
  price: number;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const business_profile_id = searchParams.get(
      "business_profile_id"
    );

    if (!business_profile_id) {
      return NextResponse.json(
        { message: "business_profile_id required" },
        { status: 400 }
      );
    }

    /* ---------- FETCH SERVICES ---------- */
    const [services] = await db.query<ServiceRow[]>(
      `SELECT 
         id AS service_id,
         name AS service_name,
         e_sim,
         activation_time,
         home_delivery_option
       FROM sim_services
       WHERE connectivity_sim_business_profile_id = ?`,
      [business_profile_id]
    );

    if (services.length === 0) {
      return NextResponse.json({
        success: true,
        data: []
      });
    }

    const serviceIds = services.map((s) => s.service_id);

    /* ---------- FETCH PLANS ---------- */
    const [plans] = await db.query<PlanRow[]>(
      `SELECT 
         id,
         sim_service_id,
         plan_name,
         sim_name,
         details,
         price
       FROM sim_service_plans
       WHERE sim_service_id IN (?)`,
      [serviceIds]
    );

    /* ---------- MERGE ---------- */
    const data = services.map((service) => ({
      id: service.service_id,
      name: service.service_name,
      e_sim: !!service.e_sim,
      activation_time: service.activation_time,
      home_delivery_option: !!service.home_delivery_option,
      plans: plans.filter(
        (p) => p.sim_service_id === service.service_id
      )
    }));

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error("[SIM_PLANS_LIST]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
