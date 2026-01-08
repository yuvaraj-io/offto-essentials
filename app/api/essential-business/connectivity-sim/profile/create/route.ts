import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBusinessFromRequest } from "@/lib/auth/business-auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { business_login_id } = getBusinessFromRequest(req);

    const {
      name,
      email,
      phone_number,
      about,
      address,
      landmark,
      pincode,
      latitude,
      longitude
    } = await req.json();

    if (!name || !email || !phone_number) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      `INSERT INTO connectivity_sim_business_profile (
        id,
        business_login_id,
        name,
        email,
        phone_number,
        about,
        address,
        landmark,
        pincode,
        latitude,
        longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuidv4(),
        business_login_id,
        name,
        email,
        phone_number,
        about || null,
        address || null,
        landmark || null,
        pincode || null,
        latitude || null,
        longitude || null
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Profile created successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Unauthorized or server error" },
      { status: 401 }
    );
  }
}
