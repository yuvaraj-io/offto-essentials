import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessFromRequest } from "@/lib/auth/business-auth";
import { RowDataPacket } from "mysql2";

interface BusinessProfileRow extends RowDataPacket {
  id: string;
  name: string;
  address: string | null;
  phone_number: string;
  email: string;
}

export async function GET(req: Request) {
  try {
    // 1️⃣ Auth: who is logged in
    const { business_login_id } = getBusinessFromRequest(req);

    // 2️⃣ Get business_profile_id from query
    const { searchParams } = new URL(req.url);
    const businessProfileId = searchParams.get("id");

    if (!businessProfileId) {
      return NextResponse.json(
        { message: "business_profile_id is required" },
        { status: 400 }
      );
    }

    // 3️⃣ Fetch business profile (ownership enforced)
    const [rows] = await db.query<BusinessProfileRow[]>(
      `
      SELECT
        *
      FROM connectivity_sim_business_profile
      WHERE id = ?
        AND business_login_id = ?
      LIMIT 1
      `,
      [businessProfileId, business_login_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Business not found or access denied" },
        { status: 404 }
      );
    }

    // 4️⃣ Success
    return NextResponse.json({
      success: true,
      data: rows[0]
    });
  } catch (err) {
    console.error("[PROFILE_DETAIL]", err);
    return NextResponse.json(
      { message: "Unauthorized or server error" },
      { status: 401 }
    );
  }
}
