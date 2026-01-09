
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    business_profile_id,
    bank_account_number,
    bank_account_name,
    bank_account_type,
    bank_name,
    branch_name
  } = body;

  if (
    !business_profile_id ||
    !bank_account_number ||
    !bank_account_name ||
    !bank_account_type ||
    !bank_name ||
    !branch_name
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const [existing]: any = await db.query(
    `SELECT id FROM business_bank_details
     WHERE business_profile_id = ?
     LIMIT 1`,
    [business_profile_id]
  );

  if (existing.length === 0) {
    // INSERT
    await db.query(
      `INSERT INTO business_bank_details (
        id,
        business_profile_id,
        bank_account_number,
        bank_account_name,
        bank_account_type,
        bank_name,
        branch_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        uuidv4(),
        business_profile_id,
        bank_account_number,
        bank_account_name,
        bank_account_type,
        bank_name,
        branch_name
      ]
    );
  } else {
    // UPDATE
    await db.query(
      `UPDATE business_bank_details
       SET
         bank_account_number = ?,
         bank_account_name = ?,
         bank_account_type = ?,
         bank_name = ?,
         branch_name = ?
       WHERE business_profile_id = ?`,
      [
        bank_account_number,
        bank_account_name,
        bank_account_type,
        bank_name,
        branch_name,
        business_profile_id
      ]
    );
  }

  return NextResponse.json({
    success: true,
    message: "Bank details saved successfully"
  });
}
