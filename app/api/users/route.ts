// import { getDB } from "@/lib/db";
// import { NextResponse } from "next/server";

// /**
//  * GET - Fetch all users
//  */
// export async function GET() {
//   const db = getDB();
//   const [rows] = await db.query("SELECT * FROM users");

//   return NextResponse.json(rows);
// }

// /**
//  * POST - Create new user
//  */
// export async function POST(request) {
//   const { name, email } = await request.json();
//   const db = getDB();

//   const [result] = await db.query(
//     "INSERT INTO users (name, email) VALUES (?, ?)",
//     [name, email]
//   );

//   return NextResponse.json({
//     id: result.insertId,
//     name,
//     email,
//   });
// }


// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { name, email } = await request.json();
//   const db = getDB();

//   await db.query(
//     "UPDATE users SET name = ?, email = ? WHERE id = ?",
//     [name, email, id]
//   );

//   return NextResponse.json({
//     message: "User updated",
//   });
// }

// /**
//  * DELETE - Remove user
//  */
// export async function DELETE(request, { params }) {
//   const { id } = params;
//   const db = getDB();

//   await db.query("DELETE FROM users WHERE id = ?", [id]);

//   return NextResponse.json({
//     message: "User deleted",
//   });
// }