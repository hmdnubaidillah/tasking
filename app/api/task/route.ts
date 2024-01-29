import { prisma } from "@/libs/lib.db";
import http from "http-status-codes";
import HttpExcepction from "@/helpers/http-excepction";

// get all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();

    if (!tasks) {
      throw new HttpExcepction(http.NOT_FOUND, "Tasks not found");
    }

    return Response.json({ tasks }, { status: http.OK });
  } catch (error) {
    console.log(error);

    if (error instanceof HttpExcepction) {
      return Response.json({ error: error.message }, { status: error.errorCode });
    }

    return Response.json({ error: "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
  }
}
