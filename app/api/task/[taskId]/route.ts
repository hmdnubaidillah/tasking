import http from "http-status-codes";
import { prisma } from "@/lib/lib.db";
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
