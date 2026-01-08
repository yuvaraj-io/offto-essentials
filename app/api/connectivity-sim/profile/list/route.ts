import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface ProfileRow extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  is_verified: number;
  profile_pic: string | null;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const business_login_id = searchParams.get("business_login_id");

    if (!business_login_id) {
      return NextResponse.json(
        { message: "business_login_id required" },
        { status: 400 }
      );
    }

    const [rows] = await db.query<ProfileRow[]>(
      `SELECT id, name, email, phone_number, is_verified, profile_pic
       FROM connectivity_sim_business_profile
       WHERE business_login_id = ?`,
      [business_login_id]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
