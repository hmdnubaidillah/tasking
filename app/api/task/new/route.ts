import http from "http-status-codes";
import { prisma } from "@/libs/lib.db";
import { taskSchema } from "@/libs/lib.validation";
import HttpExcepction from "@/helpers/http-excepction";
import { error } from "console";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const validatedTask = await taskSchema.validate(body);

    const existingTask = await prisma.task.findFirst({
      where: {
        name: validatedTask.name,
      },
    });

    if (existingTask) {
      throw new HttpExcepction(http.CONFLICT, "Task already exist");
    }

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

    if (error instanceof HttpExcepction) {
      return Response.json({ error: error.message }, { status: error.errorCode });
    }
  }

  return Response.json({ error: "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
}
