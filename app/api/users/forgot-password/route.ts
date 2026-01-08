import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

interface ForgotPasswordRequest {
  phone_no: string;
  new_password: string;
}

export async function POST(req: Request) {
  try {
    const body: ForgotPasswordRequest = await req.json();
    const { phone_no, new_password } = body;

    if (!phone_no || !new_password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(new_password, 10);

    const [result]: any = await db.query(
      "UPDATE users_login SET password_hash = ? WHERE phone_no = ?",
      [passwordHash, phone_no]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully"
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
