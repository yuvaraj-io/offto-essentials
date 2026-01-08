import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const {
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

    await db.query(
      `UPDATE sim_services
       SET name = ?,
           e_sim = ?,
           passport_required = ?,
           aadhar_required = ?,
           photo_required = ?,
           activation_time = ?,
           home_delivery_option = ?,
           pickup_latitude = ?,
           pickup_longitude = ?,
           sim_replace_availability = ?
       WHERE id = ?`,
      [
        name,
        e_sim ? 1 : 0,
        passport_required ? 1 : 0,
        aadhar_required ? 1 : 0,
        photo_required ? 1 : 0,
        activation_time || null,
        home_delivery_option ? 1 : 0,
        pickup_latitude || null,
        pickup_longitude || null,
        sim_replace_availability ? 1 : 0,
        params.id
      ]
    );

    return NextResponse.json({
      success: true,
      message: "SIM service updated successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
