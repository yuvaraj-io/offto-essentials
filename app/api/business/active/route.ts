// app/api/business/active/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getBusinessFromRequest } from "@/lib/auth/business-auth";
import { RowDataPacket } from "mysql2";

interface SubscriptionRow extends RowDataPacket {
  from_date: string;
  to_date: string;
}

export async function GET(req: Request) {
  const { business_login_id } = getBusinessFromRequest(req);
  const cookieStore = await cookies();

    const activeBusinessId = cookieStore.get("active_business_id")?.value;

  if (!activeBusinessId) {
    return NextResponse.json({ activeBusiness: null });
  }

  const [rows]: any = await db.query(
    `
    SELECT
      id,
      name,
      phone_number
    FROM connectivity_sim_business_profile
    WHERE id = ?
      AND business_login_id = ?
    LIMIT 1
    `,
    [activeBusinessId, business_login_id]
  );

  const [subscriptionRows] = await db.query<SubscriptionRow[]>(
    `SELECT from_date, to_date
      FROM subscriptions
      WHERE business_profile_id = ?
        AND CURDATE() >= from_date
        AND CURDATE() < DATE_ADD(to_date, INTERVAL 1 DAY)
      LIMIT 1`,
    [activeBusinessId]
  );

  

  if (!rows.length) {
    return NextResponse.json({ activeBusiness: null });
  }

  return NextResponse.json({
    activeBusiness: {...rows[0],  isSubscribed: subscriptionRows.length > 0},
  });
}
