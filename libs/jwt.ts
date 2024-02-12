import jwt, { JwtPayload } from "jsonwebtoken";

export async function createToken(id: string) {
  return jwt.sign({ id }, "secret", {
    expiresIn: 10 * 365 * 24 * 60 * 60,
  });
}

export async function jwtDecode(token: any) {
  return jwt.verify(token, "secret");
}
