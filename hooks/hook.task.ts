import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

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
