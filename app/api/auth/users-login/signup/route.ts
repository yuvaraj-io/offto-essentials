import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { phone_no, password } = await req.json();

    if (!phone_no || !password) {
      return NextResponse.json(
        { message: "Phone number and password required" },
        { status: 400 }
      );
    }

    const password_hash = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users_login (id, phone_no, password_hash)
       VALUES (?, ?, ?)`,
      [uuidv4(), phone_no, password_hash]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Phone number already registered" },
        { status: 409 }
      );
    }

    console.error("[SIGNUP]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
