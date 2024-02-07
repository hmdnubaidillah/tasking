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
  id: string;
  userId: string;
  name: string;
  desc?: string;
  dateDl?: string;
  category: string;
  importance: string;
}

export interface TaskFormType {
  name: string;
  desc?: string;
  date?: string;
  time?: string;
  category: string;
  importance: string;
}

export interface ErrorResponse {
  error: string;
}
