import jwt from "jsonwebtoken";

export async function createToken(id: string) {
  return jwt.sign({ id }, "secret", {
    expiresIn: "24h",
  });
}
