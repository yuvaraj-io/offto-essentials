import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

interface SignupRequest {
  phone_no: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const body: SignupRequest = await req.json();
    const { phone_no, password } = body;

    if (!phone_no || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const [existing] = await db.query<any[]>(
      "SELECT id FROM users_login WHERE phone_no = ?",
      [phone_no]
    );

    if (existing.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users_login (phone_no, password_hash) VALUES (?, ?)",
      [phone_no, passwordHash]
    );

    return NextResponse.json({
      success: true,
      message: "Signup successful"
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
