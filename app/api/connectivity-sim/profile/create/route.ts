import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      business_login_id,
      name,
      email,
      phone_number,
      about,
      latitude,
      longitude,
      address,
      landmark,
      pincode,
      profile_pic
    } = body;

    if (!business_login_id || !name || !email || !phone_number) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const id = uuidv4();

    await db.query(
      `INSERT INTO connectivity_sim_business_profile (
        id, business_login_id, name, email, phone_number,
        about, latitude, longitude, address, landmark, pincode, profile_pic
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        business_login_id,
        name,
        email,
        phone_number,
        about || null,
        latitude || null,
        longitude || null,
        address || null,
        landmark || null,
        pincode || null,
        profile_pic || null
      ]
    );

    return NextResponse.json({
      success: true,
      id,
      message: "Profile created successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
