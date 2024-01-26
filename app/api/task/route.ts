import { prisma } from "@/lib/lib.db";
import http from "http-status-codes";

// get all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();

    if (!tasks) {
      return Response.json({ message: "users not found" }, { status: http.NOT_FOUND });
    }

    return Response.json({ tasks }, { status: http.OK });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return Response.json({ error: error.message || "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
    }
  }
}
