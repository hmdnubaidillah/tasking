import { TaskIdType } from "@/types";
import { prisma } from "@/lib/lib.db";
import http from "http-status-codes";

export async function PATCH(req: Request, { params }: TaskIdType) {
  const body = await req.json();

  try {
    const task = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        isOngoing: body.isOngoing,
        dateDl: body.dateDl,
        importance: body.importance,
        isDone: body.isDone,
        name: body.name,
        category: body.category,
      },
    });

    return Response.json({ updatedTask: task }, { status: http.OK });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return Response.json({ error: error.name }, { status: http.INTERNAL_SERVER_ERROR });
    }
  }
}
