import { prisma } from "@/lib/lib.db";
import { decrypt } from "@/helpers/helper.bcrypt";
import { createToken } from "@/helpers/helper.jwt";
import { UserType } from "@/types";
import http from "http-status-codes";

export async function POST(req: Request) {
  const { username, password }: UserType = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return Response.json({ message: "username not found" }, { status: http.NOT_FOUND });
    }

    const auth = await decrypt(password, user.password!);

    if (!auth) {
      return Response.json({ message: "password incorrect" }, { status: http.UNAUTHORIZED });
    }

    const token = await createToken(user.id);

    return Response.json({ user, headers: { authorization: `token=${token}` } }, { status: http.OK });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: http.INTERNAL_SERVER_ERROR });
    }
  }
}
