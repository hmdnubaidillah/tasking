import { TaskIdType } from "@/types";
import { prisma } from "@/libs/db";
import http from "http-status-codes";
import HttpExcepction from "@/helpers/httpException";

export async function DELETE(req: Request, { params }: TaskIdType) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: params.taskId,
      },
    });

    if (!task) {
      throw new HttpExcepction(http.NOT_FOUND, "Task not found");
    }

    return Response.json({ deletedTask: task }, { status: http.OK });
  } catch (error) {
    console.log(error);

    if (error instanceof HttpExcepction) {
      return Response.json({ error: error.message }, { status: error.errorCode });
    }

    return Response.json({ error: "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
  }
}
