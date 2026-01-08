import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [result]: any = await db.query(
      "DELETE FROM connectivity_sim_business_profile WHERE id = ?",
      [params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile deleted successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
