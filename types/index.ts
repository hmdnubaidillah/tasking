import { Prisma } from "@prisma/client";

export interface UserType {
  email: string;
  username: string;
  password: string;
  usernameOrEmail: string;
}

export type TaskType = {
  creator: string;
  desc?: string;
  dateDl: Date;
  category: string;
  importance: string;
};

export interface TaskIdType {
  params: {
    taskId: string;
  };
}

export interface RegisterFormType {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}
