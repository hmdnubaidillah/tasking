import { prisma } from "@/lib/lib.db";
import http from "http-status-codes";
import HttpExcepction from "@/helpers/http-excepction";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
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
  }
}
