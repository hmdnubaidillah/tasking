import { date, object, string, ref } from "yup";

export const userSchema = object({
  email: string().email("not a proper email").required("email is required"),
  username: string().required("username is required").min(4, "minimum username length is 4"),
  password: string()
    .required("password is required")
    .min(8, "minimum password length is 8")
    .matches(/[a-z]/, "password must be atleast have 1 lowercase char"),
});

export const taskSchema = object({
  name: string().required("task name is required"),
  desc: string(),
  category: string().required("category is required"),
  dateDl: date(),
  importance: string().required("importance is required"),
});

export const registerSchema = object({
  email: string().email("not a proper email").required("email is required"),
  username: string().required("username is required").min(4, "min username length is 4"),
  password: string()
    .required("password is required")
    .min(8, "min password length is 8")
    .matches(/[A-Z]/, "password need 1 uppercase"),
  passwordRepeat: string()
    .required("please repeat password")
    .oneOf([ref("password")], "password dont match"),
});
