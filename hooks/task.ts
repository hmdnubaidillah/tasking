import { TaskType } from "@/types";
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
      queryClient.invalidateQueries({ queryKey: ["user"] });
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

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationKey: ["deleteGoal"],
    mutationFn: ({ taskId }: { taskId: string }) => axios.delete(`/api/task/${taskId}/delete`),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    data,
  };
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
    mutationFn: (formData: { taskId: string; task: TaskType }) =>
      axios.patch(`/api/task/${formData.taskId}/update`, { ...formData.task }),
    mutationKey: ["updateTask"],

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    data,
    isError,
    error,
  };
}
