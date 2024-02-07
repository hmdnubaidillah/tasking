import { prisma } from "@/libs/lib.db";
import { decrypt } from "@/libs/lib.bcrypt";
import { createToken } from "@/libs/lib.jwt";
import { UserType } from "@/types";
import http from "http-status-codes";
import HttpExcepction from "@/helpers/helper.httpException";
import { cookies } from "next/headers";

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
      throw new HttpExcepction(http.UNAUTHORIZED, "password incorrect");
    }

    const token = await createToken(user.id);

    cookies().set("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60,
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    return Response.json({ user: user }, { status: http.OK });
  } catch (error) {
    console.log(error);

    if (error instanceof HttpExcepction) {
      return Response.json({ error: error.message }, { status: error.errorCode });
    }

    return Response.json({ error: "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
  }
}
