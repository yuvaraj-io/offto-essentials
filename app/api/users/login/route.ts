import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface LoginRequest {
  phone_no: string;
  password: string;
}

interface UserRow extends RowDataPacket {
  id: number;
  phone_no: string;
  password_hash: string;
  is_active: number;
}

export async function POST(req: Request) {
  try {
    const body: LoginRequest = await req.json();
    const { phone_no, password } = body;

    const [rows] = await db.query<UserRow[]>(
      "SELECT * FROM users_login WHERE phone_no = ? AND is_active = 1",
      [phone_no]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, phone_no: user.phone_no },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        phone_no: user.phone_no
      }
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
