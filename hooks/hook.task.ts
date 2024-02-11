import { TaskFormType, TaskType } from "@/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useGetTasks() {
  const { data, isPending, isSuccess, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => axios.get("api/task"),
  });

  return {
    data,
    isPending,
    isSuccess,
    error,
    isError,
  };
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isSuccess, error, isError } = useMutation({
    mutationKey: ["createTask"],
    mutationFn: (formData: TaskType) => axios.post("/api/task/new", formData),
    onError: (err: AxiosError) => {
      if (axios.isAxiosError(err) && err.response) {
        return err;
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    mutate,
    data,
    isPending,
    isSuccess,
    error,
    isError,
  };
}
