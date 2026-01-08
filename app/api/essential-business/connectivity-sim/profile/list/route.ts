import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface ProfileRow extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  is_verified: number;
  profile_pic: string | null;
}

interface BusinessTokenPayload {
  businessId: string;
  type: "BUSINESS";
  iat: number;
  exp: number;
}

export async function GET(req: Request) {
  try {
    // 1️⃣ Read cookie
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("business_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2️⃣ Verify JWT
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "JWT secret not configured" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as BusinessTokenPayload;

    if (decoded.type !== "BUSINESS") {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // 3️⃣ Use business_login_id from token
    const business_login_id = decoded.businessId;

    // 4️⃣ Query DB
    const [rows] = await db.query<ProfileRow[]>(
      `SELECT *
       FROM connectivity_sim_business_profile
       WHERE business_login_id = ?`,
      [business_login_id]
    );

    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
