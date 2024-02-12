import { TaskIdType } from "@/types";
import { prisma } from "@/libs/db";
import http from "http-status-codes";
import HttpExcepction from "@/helpers/httpException";
import { updateTaskSchema } from "@/libs/validation";

export async function PATCH(req: Request, { params }: TaskIdType) {
  const body = await req.json();

  try {
    const validatedTask = await updateTaskSchema.validate(body);

    const task = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        name: validatedTask.name,
        desc: validatedTask.desc,
        importance: validatedTask.importance,
        isDone: validatedTask.isDone,
        category: validatedTask.category,
        dateDl: validatedTask.dateDl,
        isOngoing: validatedTask.isOngoing,
      },
    });

    if (!task) {
      throw new HttpExcepction(http.NOT_FOUND, "Task not found");
    }

    return Response.json({ updatedTask: task }, { status: http.OK });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return Response.json({ error: error.name }, { status: http.INTERNAL_SERVER_ERROR });
    }

    return Response.json({ error: "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
  }
}
