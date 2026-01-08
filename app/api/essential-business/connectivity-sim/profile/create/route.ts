import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessFromRequest } from "@/lib/auth/business-auth";

export async function GET(req: Request) {
  try {
    const { business_login_id } = getBusinessFromRequest(req);

    const [rows] = await db.query(
      `SELECT * FROM connectivity_sim_business_profile
       WHERE business_login_id = ?`,
      [business_login_id]
    );

    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (err: any) {
    if (err.message === "NOT_AUTHENTICATED") {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
