import jwt from "jsonwebtoken";

interface BusinessTokenPayload {
  businessId: string;
  type: "BUSINESS";
  iat: number;
  exp: number;
}

export function getBusinessFromRequest(req: Request) {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const token = cookieHeader
    .split("; ")
    .find((c) => c.startsWith("business_token="))
    ?.split("=")[1];

  if (!token) {
    throw new Error("NOT_AUTHENTICATED");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET_MISSING");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  ) as BusinessTokenPayload;

  if (decoded.type !== "BUSINESS") {
    throw new Error("INVALID_TOKEN");
  }

  return {
    business_login_id: decoded.businessId
  };
}
