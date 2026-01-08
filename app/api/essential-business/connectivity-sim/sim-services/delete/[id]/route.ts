import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.query(
      "DELETE FROM sim_services WHERE id = ?",
      [params.id]
    );

    return NextResponse.json({
      success: true,
      message: "SIM service deleted successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
