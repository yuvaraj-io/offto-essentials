import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface SimServiceRow extends RowDataPacket {
  id: string;
}

export async function GET(
  _req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const [rows] = await db.query<SimServiceRow[]>(
      `SELECT *
       FROM sim_services
       WHERE connectivity_sim_business_profile_id = ?`,
      [params.profileId]
    );

    if (rows.length === 0) {
      return NextResponse.json({
        success: true,
        data: null
      });
    }

    return NextResponse.json({
      success: true,
      data: rows[0]
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
