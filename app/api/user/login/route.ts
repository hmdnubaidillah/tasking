import { prisma } from "@/lib/lib.db";
import { decrypt } from "@/lib/lib.bcrypt";
import { createToken } from "@/lib/lib.jwt";
import { UserType } from "@/types";
import http from "http-status-codes";
import HttpExcepction from "@/helpers/http-excepction";

export async function POST(req: Request) {
  const { usernameOrEmail, password }: UserType = await req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });

    if (!user) {
      throw new HttpExcepction(http.NOT_FOUND, "username or email not found");
    }

    const auth = await decrypt(password, user.password);

    if (!auth) {
      throw new HttpExcepction(http.UNAUTHORIZED, "Password incorrect");
    }

    const token = await createToken(user.id);
    return Response.json({ user: user, headers: { authorization: `token=${token}` } }, { status: http.OK });
  } catch (error) {
    console.log(error);

    if (error instanceof HttpExcepction) {
      return Response.json({ error: error.message }, { status: error.errorCode });
    }
  }
}
