import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sim_service_id = searchParams.get("sim_service_id");

  if (!sim_service_id) {
    return NextResponse.json(
      { message: "sim_service_id required" },
      { status: 400 }
    );
  }

  const [[service]]: any = await db.query(
    `SELECT *
     FROM sim_services
     WHERE id = ?`,
    [sim_service_id]
  );

  const [plans]: any = await db.query(
    `SELECT plan_name, sim_name, details, price
     FROM sim_service_plans
     WHERE sim_service_id = ?`,
    [sim_service_id]
  );

  return NextResponse.json({
    success: true,
    data: {
      ...service,
      plans
    }
  });
}
