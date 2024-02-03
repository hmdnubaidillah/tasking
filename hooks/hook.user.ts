import { LoginFormType, RegisterFormType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useRegister() {
  const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (formdata: RegisterFormType) => axios.post("api/user/register", formdata),
    onError: (err: AxiosError) => {
      if (axios.isAxiosError(err) && err.response) {
        return err;
      }
    },
  });

  return {
    mutate,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
}

export function useLogin() {
  const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: (formData: LoginFormType) => axios.post("api/user/login", formData),
    onError: (err: AxiosError) => {
      if (axios.isAxiosError(err) && err.response) {
        return err;
      }
    },
    onSuccess: () => {},
  });

  return {
    mutate,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
