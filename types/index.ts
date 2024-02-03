import { AxiosError } from "axios";

export interface UserType {
  email: string;
  username: string;
  password: string;
  usernameOrEmail?: string;
}

export interface TaskIdType {
  params: {
    taskId: string;
  };
}

export interface RegisterFormType extends UserType {
  passwordRepeat: string;
}

export interface LoginFormType {
  usernameOrEmail: string;
  password: string;
}

export interface TaskType {
  name: string;
  desc?: string;
  dateDl?: Date;
  category: string;
  importance: string;
}

export interface ErrorResponse {
  error: string;
}
