import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      connectivity_sim_business_profile_id,
      name,
      e_sim,
      passport_required,
      aadhar_required,
      photo_required,
      activation_time,
      home_delivery_option,
      pickup_latitude,
      pickup_longitude,
      sim_replace_availability
    } = body;

    if (!connectivity_sim_business_profile_id || !name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Optional: prevent duplicate sim_services per profile
    const [existing]: any = await db.query(
      `SELECT id FROM sim_services
       WHERE connectivity_sim_business_profile_id = ?`,
      [connectivity_sim_business_profile_id]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "SIM service already exists for this profile" },
        { status: 409 }
      );
    }

    const id = uuidv4();

    await db.query(
      `INSERT INTO sim_services (
        id,
        connectivity_sim_business_profile_id,
        name,
        e_sim,
        passport_required,
        aadhar_required,
        photo_required,
        activation_time,
        home_delivery_option,
        pickup_latitude,
        pickup_longitude,
        sim_replace_availability
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        connectivity_sim_business_profile_id,
        name,
        e_sim ? 1 : 0,
        passport_required ? 1 : 0,
        aadhar_required ? 1 : 0,
        photo_required ? 1 : 0,
        activation_time || null,
        home_delivery_option ? 1 : 0,
        pickup_latitude || null,
        pickup_longitude || null,
        sim_replace_availability ? 1 : 0
      ]
    );

    

    return NextResponse.json({
      success: true,
      id,
      message: "SIM service created successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
