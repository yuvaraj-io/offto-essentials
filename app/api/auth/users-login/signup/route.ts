import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

interface SignupRequest {
  phone_no: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { phone_no, password }: SignupRequest = await req.json();

    if (!phone_no || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const [existing]: any = await db.query(
      "SELECT id FROM users_login WHERE phone_no = ?",
      [phone_no]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users_login 
       (id, phone_no, password_hash) 
       VALUES (UUID(), ?, ?)`,
      [phone_no, passwordHash]
    );

    return NextResponse.json({
      success: true,
      message: "User registered successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
