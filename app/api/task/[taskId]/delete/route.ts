import { TaskIdType } from "@/types";
import { prisma } from "@/lib/lib.db";
import http from "http-status-codes";

export async function DELETE(req: Request, { params }: TaskIdType) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: params.taskId,
      },
    });

    return Response.json({ deletedTask: task }, { status: http.OK });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return Response.json({ error: error.name }, { status: http.INTERNAL_SERVER_ERROR });
    }
  }
}
