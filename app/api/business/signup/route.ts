import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

interface BusinessSignupRequest {
  phone_no: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { phone_no, email, password }: BusinessSignupRequest =
      await req.json();

    if (!phone_no || !email || !password) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    const [existing]: any = await db.query(
      "SELECT id FROM business_login WHERE phone_no = ? OR email = ?",
      [phone_no, email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Business already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO business_login
       (id, phone_no, email, password_hash)
       VALUES (UUID(), ?, ?, ?)`,
      [phone_no, email, passwordHash]
    );

    return NextResponse.json({
      success: true,
      message: "Business registered successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
