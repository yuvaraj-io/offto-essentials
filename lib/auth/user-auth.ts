import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface UserTokenPayload {
  user_id: string;
  phone_no: string;
  type: "USER";
}

export async function getUserFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as UserTokenPayload;
    console.log(decoded); 
    if (!decoded?.user_id) {
      throw new Error("Invalid token type");
    }
    
    return {
      user_id: decoded.user_id,
      phone_no: decoded.phone_no
    };
  } catch {
    
    throw new Error("Invalid or expired token");
  }
}
