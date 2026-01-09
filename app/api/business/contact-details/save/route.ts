import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const {
      business_profile_id,
      phone_number,
      email
    } = await req.json();

    if (!business_profile_id || !phone_number || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO business_contact_details (
        id,
        business_profile_id,
        phone_number,
        email
      ) VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        phone_number = VALUES(phone_number),
        email = VALUES(email)
      `,
      [
        uuidv4(),
        business_profile_id,
        phone_number,
        email
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Contact details saved"
    });
  } catch (err) {
    console.error("[CONTACT_SAVE]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
