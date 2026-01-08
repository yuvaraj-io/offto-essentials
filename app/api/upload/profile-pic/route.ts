import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  // 2MB limit
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json(
      { message: "File size exceeds 2MB" },
      { status: 400 }
    );
  }

  // Allow only images
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { message: "Only image files allowed" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuidv4()}${path.extname(file.name)}`;
  const uploadPath = path.join(
    process.cwd(),
    "public/uploads/business/profiles",
    filename
  );

  await writeFile(uploadPath, buffer);

  return NextResponse.json({
    success: true,
    path: `/uploads/business/profiles/${filename}`
  });
}
