import http from "http-status-codes";
import { prisma } from "@/lib/lib.db";

interface Params {
  params: {
    taskId: string;
  };
}

export async function GET(req: Request, { params }: Params) {
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
    if (error instanceof Error) {
      return Response.json({ error: error.message || "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
    }
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: params.taskId,
      },
    });

    return Response.json({ deletedTask }, { status: http.OK });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message || "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
    }
  }
}

export async function PATCH(req: Request, { params }: Params) {
  return Response.json({});
}
