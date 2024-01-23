import { prisma } from "@/lib/lib.db";
import http from "http-status-codes";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return Response.json({ message: "users not found" }, { status: http.NOT_FOUND });
    }

    return Response.json({ users }, { status: http.OK });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message || "INTERNAL SERVER ERROR" }, { status: http.INTERNAL_SERVER_ERROR });
    }
  }
}
