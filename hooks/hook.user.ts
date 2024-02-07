import { LoginFormType, RegisterFormType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { Axios, AxiosError } from "axios";

export function useRegister() {
  const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["register"],
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

export function useGetUser() {
  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => axios.get("/api/user"),
  });

  return {
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
