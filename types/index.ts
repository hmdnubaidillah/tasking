export interface UserType {
  username: string;
  password: string;
}

export interface TaskType {
  name: string;
  desc: string;
  dateDl: Date;
  category: string;
  importance: string;
  isDone: boolean;
  isOngoing: boolean;
}
