import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { phone_no } = await req.json();
  const token = uuidv4();

  await db.query(
    `INSERT INTO user_password_resets
     (id, phone_no, token, expires_at)
     VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))`,
    [uuidv4(), phone_no, token]
  );

  // TODO: send SMS
  console.log("Reset token:", token);

  return NextResponse.json({ success: true });
}
