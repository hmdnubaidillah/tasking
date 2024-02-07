import { prisma } from "@/libs/lib.db";
import http from "http-status-codes";
import HttpExcepction from "@/helpers/helper.httpException";
import { cookies } from "next/headers";
import { jwtDecode } from "@/libs/lib.jwt";

interface User {
  id: string;
}

export async function GET(req: Request) {
  const token = cookies().get("token");

  const id = ((await jwtDecode(token?.value)) as User).id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: { tasks: true },
    });

    if (!user) {
      throw new HttpExcepction(http.NOT_FOUND, "User not found");
    }

    return Response.json({ user }, { status: http.OK });
  } catch (error) {
    if (error instanceof HttpExcepction) {
      return Response.json({ error: error.message }, { status: error.errorCode });
    }

    return Response.json({ error: "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
  }
}
