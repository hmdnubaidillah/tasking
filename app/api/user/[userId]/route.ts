import { prisma } from "@/lib/lib.db";
import http from "http-status-codes";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
      include: { tasks: true },
    });

    if (!user) {
      return Response.json({ message: "user not found" }, { status: http.NOT_FOUND });
    }

    return Response.json({ user }, { status: http.OK });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { error: error.message || http.INTERNAL_SERVER_ERROR },
        { status: http.INTERNAL_SERVER_ERROR }
      );
    }
  }
}
