import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1 AS connected");

    return NextResponse.json({
      success: true,
      db: rows
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "DB connection failed" },
      { status: 500 }
    );
  }
}
