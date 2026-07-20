import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "development-secret";

export function createToken(customerId: string) {
  return jwt.sign(
    {
      sub: customerId,
    },
    SECRET,
    {
      expiresIn: "7d",
    },
  );
}
