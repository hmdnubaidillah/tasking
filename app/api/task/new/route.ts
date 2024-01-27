import http from "http-status-codes";
import { TaskType } from "@/types";
import { prisma } from "@/lib/lib.db";
import { taskSchema } from "@/lib/lib.validation";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const validatedTask = await taskSchema.validate(body);
    const newTask = await prisma.task.create({
      data: {
        author: { connect: { id: body.userId } },
        name: validatedTask.name,
        desc: validatedTask.desc,
        dateDl: validatedTask.dateDl,
        category: validatedTask.category,
        importance: validatedTask.importance,
      },
    });

    return Response.json({ task: newTask }, { status: http.CREATED });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return Response.json({ error }, { status: http.INTERNAL_SERVER_ERROR });
    }
  }
}
