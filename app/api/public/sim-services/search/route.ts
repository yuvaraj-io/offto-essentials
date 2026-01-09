// app/api/public/sim-services/search/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = Number(searchParams.get("lat"));
    const lng = Number(searchParams.get("lng"));
    const date = searchParams.get("date");
    const keyword = searchParams.get("keyword") || "";
    const radius = 100;

    if (!lat || !lng || !date) {
      return NextResponse.json(
        { message: "lat, lng and date are required" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      `
      SELECT
        b.id AS business_id,
        b.name,
        b.address,
        b.latitude,
        b.longitude,
        s.id AS sim_service_id,
        MIN(p.price) AS starting_price,
        (
          6371 * acos(
            cos(radians(?)) * cos(radians(b.latitude)) *
            cos(radians(b.longitude) - radians(?)) +
            sin(radians(?)) * sin(radians(b.latitude))
          )
        ) AS distance
      FROM connectivity_sim_business_profile b
      JOIN sim_services s
        ON s.connectivity_sim_business_profile_id = b.id
      JOIN sim_service_plans p
        ON p.sim_service_id = s.id
      WHERE NOT EXISTS (
        SELECT 1 FROM business_unavailability u
        WHERE u.business_profile_id = b.id
          AND ? BETWEEN u.from_date AND u.to_date
      )
      AND (
        b.name LIKE ?
        OR p.plan_name LIKE ?
        OR p.sim_name LIKE ?
      )
      GROUP BY b.id, s.id
      HAVING distance <= ?
      ORDER BY distance ASC
      `,
      [
        lat,
        lng,
        lat,
        date,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        radius
      ]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("[SIM_SEARCH]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
