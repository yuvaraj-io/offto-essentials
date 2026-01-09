import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie");
  const token = cookie?.match(/auth_token=([^;]+)/)?.[1];

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({
      loggedIn: true,
      user: decoded,
    });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
