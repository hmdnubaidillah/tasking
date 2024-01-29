import { TaskIdType } from "@/types";
import { prisma } from "@/libs/lib.db";
import http from "http-status-codes";
import HttpExcepction from "@/helpers/http-excepction";
import { updateTaskSchema } from "@/libs/lib.validation";

export async function PATCH(req: Request, { params }: TaskIdType) {
  const body = await req.json();

  try {
    const validatedTask = await updateTaskSchema.validate(body);

    const task = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        isOngoing: validatedTask.isOngoing,
        dateDl: validatedTask.dateDl,
        importance: validatedTask.importance,
        isDone: validatedTask.isDone,
        name: validatedTask.name,
        category: validatedTask.category,
        desc: validatedTask.desc,
      },
    });

    return Response.json({ updatedTask: task }, { status: http.OK });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return Response.json({ error: error.name }, { status: http.INTERNAL_SERVER_ERROR });
    }

    return Response.json({ error: "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
  }
}
