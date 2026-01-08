import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface BusinessTokenPayload {
  businessId: string;
  type: "BUSINESS";
  iat: number;
  exp: number;
}

export async function GET(req: Request) {
  try {
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
        { message: "Invalid token type" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      business_login_id: decoded.businessId
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
