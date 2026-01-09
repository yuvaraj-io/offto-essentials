import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const {
      business_profile_id,
      inclusions,
      exclusions
    } = await req.json();

    if (!business_profile_id || !inclusions || !exclusions) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO business_inclusion_exclusion (
        id,
        business_profile_id,
        inclusions,
        exclusions
      ) VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        inclusions = VALUES(inclusions),
        exclusions = VALUES(exclusions)
      `,
      [
        uuidv4(),
        business_profile_id,
        inclusions,
        exclusions
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Saved successfully"
    });
  } catch (err) {
    console.error("[INCLUSION_SAVE]", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
