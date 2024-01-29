import http from "http-status-codes";
import { prisma } from "@/libs/lib.db";
import { TaskIdType } from "@/types";

export async function GET(req: Request, { params }: TaskIdType) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
      },
    });

    if (!task) {
      return Response.json({ message: "task not found" }, { status: http.NOT_FOUND });
    }

    return Response.json({ task }, { status: http.OK });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return Response.json({ error: error.message || "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
    }
  }
}
