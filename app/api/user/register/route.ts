import { prisma } from "@/lib/lib.db";
import { encrypt } from "@/helpers/helper.bcrypt";
import http from "http-status-codes";
import { userSchema } from "@/helpers/helper.validation";
import { UserType } from "@/types";

export async function POST(req: Request) {
  const { email, username, password }: UserType = await req.json();

  try {
    const userValidated = await userSchema.validate({ email, username, password });
    const hashedPassword = await encrypt(userValidated.password);

    const newUser = await prisma.user.create({
      data: {
        email: userValidated.email,
        username: userValidated.username,
        password: hashedPassword,
      },
    });

    return Response.json({ user: newUser }, { status: http.CREATED });
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      if (error.name !== "ValidationError") {
        return Response.json(
          { error: error.message || http.INTERNAL_SERVER_ERROR },
          { status: http.INTERNAL_SERVER_ERROR }
        );
      }
      return Response.json({ error: error.message || http.BAD_REQUEST }, { status: http.BAD_REQUEST });
    }
  }
}
