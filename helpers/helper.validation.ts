import { object, string } from "yup";

export let userSchema = object({
  username: string().required("username is required").min(4),
  password: string()
    .required("password is required")
    .min(8)
    .matches(/[a-z]/, "password must be atleast have 1 lowercase char")
    .matches(/[A-Z]/, "password must be atleast have 1 uppercase char"),
});
