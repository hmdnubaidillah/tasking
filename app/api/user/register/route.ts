import { prisma } from "@/lib/lib.db";
import { encrypt } from "@/lib/lib.bcrypt";
import http from "http-status-codes";
import { userSchema } from "@/lib/lib.validation";
import { UserType } from "@/types";
import HttpExcepction from "@/helpers/http-excepction";

async function checkUserExist(email: string, username: string) {
  const existingUserEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const existingUsername = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUserEmail || existingUsername) {
    throw new HttpExcepction(http.NOT_FOUND, {
      ...(existingUserEmail ? { message: "Email already taken" } : {}),
      ...(existingUsername ? { message: "Username already taken" } : {}),
    });
  }
}

export async function POST(req: Request) {
  const { email, username, password }: UserType = await req.json();

  try {
    // check uniqueness
    const userValidated = await userSchema.validate({ email, username, password });

    await checkUserExist(userValidated.email, userValidated.username);

    const hashedPassword = await encrypt(userValidated.password);
    const newUser = await prisma.user.create({
      data: {
        email: userValidated.email,
        username: userValidated.username,
        password: hashedPassword,
      },
    });

    return Response.json({ user: newUser }, { status: http.CREATED });
  } catch (error) {
    console.log(error);

    if (error instanceof HttpExcepction) {
      return Response.json({ error: error.message }, { status: error.errorCode });
    }
  }
}
