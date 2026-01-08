import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface BusinessLoginRequest {
  phone_no?: string;
  email?: string;
  password: string;
}

interface BusinessRow extends RowDataPacket {
  id: string;          // UUID
  phone_no: string;
  email: string;
  password_hash: string;
}

export async function POST(req: Request) {
  try {
    const { phone_no, email, password }: BusinessLoginRequest =
      await req.json();

    if ((!phone_no && !email) || !password) {
      return NextResponse.json(
        { message: "Missing credentials" },
        { status: 400 }
      );
    }

    const [rows] = await db.query<BusinessRow[]>(
      `SELECT id, phone_no, email, password_hash
       FROM business_login
       WHERE phone_no = ? OR email = ?`,
      [phone_no || null, email || null]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const business = rows[0];

    const isMatch = await bcrypt.compare(
      password,
      business.password_hash
    );

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        businessId: business.id,
        type: "BUSINESS"
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      business: {
        id: business.id,
        phone_no: business.phone_no,
        email: business.email
      }
    });

    response.cookies.set("business_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
