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

    await db.query(
      `UPDATE connectivity_sim_business_profile
       SET name = ?, email = ?, phone_number = ?, about = ?,
           latitude = ?, longitude = ?, address = ?, landmark = ?,
           pincode = ?, profile_pic = ?
       WHERE id = ?`,
      [
        name,
        email,
        phone_number,
        about || null,
        latitude || null,
        longitude || null,
        address || null,
        landmark || null,
        pincode || null,
        profile_pic || null,
        params.id
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully"
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
