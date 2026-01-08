import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface ProfileRow extends RowDataPacket {
  id: string;
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.query<ProfileRow[]>(
      "SELECT * FROM connectivity_sim_business_profile WHERE id = ?",
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
