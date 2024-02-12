"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { buttonsImportance, buttonsCategory } from "@/constant";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorResponse, TaskFormType } from "@/types";
import { taskSchema } from "@/libs/validation";
import { useCreateTask } from "@/hooks/task";
import { getUserId } from "@/app/action";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function NewTaskModal({
  setTaskDialog,
}: {
  setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [btnImporatance, setBtnImporatance] = useState("");
  const [btnCategory, setBtnCategory] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<TaskFormType>({
    criteriaMode: "all",
    resolver: yupResolver(taskSchema),
  });

  const { data, mutate, isPending, isSuccess, isError, error } = useCreateTask();

  const onSubmit: SubmitHandler<TaskFormType> = async (formData) => {
    const date = moment(getValues("date")).format("DD-MMM-YYYY");
    const time = getValues("time");
    const token = (await getUserId()) as { id: string };

    console.log(formData);

    mutate({
      userId: token.id,
      name: formData.name,
      desc: formData.desc,
      dateDl: `${formData.date !== "" ? date : ""} | ${formData.time ? time : ""}`,
      category: formData.category,
      importance: formData.importance,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTaskDialog(false);
      document.querySelector("body")?.classList.remove("overflow-hidden");

      router.refresh();
    }

    if (isError) {
      console.log((error?.response?.data as ErrorResponse).error);
    }
  }, [isSuccess, setTaskDialog, isError, error, router]);

  function handleCloseModal(e: React.MouseEvent) {
    const target = (e.target as HTMLElement).id;

    if (target === "modal-container" || target === "btn-modal-close") {
      setTaskDialog(false);
      document.querySelector("body")?.classList.remove("overflow-hidden");
    } else {
      setTaskDialog(true);
    }
  }

  return (
    <div
      id="modal-container"
      onClick={handleCloseModal}
      className="fixed top-0 left-0 z-20 grid place-content-center w-full h-screen bg-[rgba(0,0,0,.5)] transition-all"
    >
      <div className="bg-white rounded-md text-textPrimary w-fit">
        <div className="border-b w-full">
          <h1 className="text-xl font-medium mx-5 my-3">Create Task</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-3 flex flex-col gap-5">
          <div>
            <Controller
              name="name"
              control={control}
              render={() => <Input type="text" placeholder="Task Name" {...register("name")} />}
            />
            {errors && <p className="text-red-600 mt-1">{errors.name?.message}</p>}
          </div>

          <div>
            <Textarea placeholder="Description..." className="resize-none" {...register("desc")} />
          </div>

          <div>
            <h1 className="font-medium">Deadline</h1>
            <div className="mt-2 flex">
              <Controller
                name="date"
                control={control}
                render={() => <Input type="date" placeholder="dd-mm-yyyy" {...register("date")} className="mr-5" />}
              />
              <Controller name="time" control={control} render={() => <Input type="time" {...register("time")} />} />
            </div>
          </div>

          <div>
            <h1 className="font-medium">Category</h1>
            <div className="flex flex-wrap gap-5 mt-2">
              {buttonsCategory.map((button, i) => (
                <div key={i}>
                  <Input
                    type="button"
                    onClick={() => {
                      setBtnCategory(button.name);
                      setValue("category", button.name);
                    }}
                    className={`${
                      btnCategory == button.name
                        ? "bg-slate-800 hover:bg-slate-800 text-white"
                        : "bg-white hover:bg-white text-textPrimary"
                    }  border px-4 py-2 rounded-md cursor-pointer text-sm font-medium`}
                    value={button.name}
                  />
                </div>
              ))}
            </div>
            {errors && <p className="text-red-600 mt-1">{errors.category?.message}</p>}
          </div>

          {/* importance */}
          <div>
            <h1 className="font-medium">Importance</h1>
            <div className="sm:flex grid grid-rows-2 grid-cols-2 sm:gap-5 gap-2 mt-2">
              {buttonsImportance.map((button, i) => (
                <Input
                  key={i}
                  type="button"
                  onClick={() => {
                    setBtnImporatance(button.name);
                    setValue("importance", button.name.toLowerCase());
                  }}
                  style={{
                    backgroundColor: btnImporatance == button.name ? "rgb(30 41 59)" : button.color,
                  }}
                  value={button.name}
                  className="cursor-pointer text-white font-medium text-sm"
                />
              ))}
            </div>
            {errors && <p className="text-red-600 mt-1">{errors.importance?.message}</p>}
          </div>

          <div className="flex gap-5 justify-end">
            <Button className="bg-primaryBlue hover:bg-primaryHoverBlue flex gap-2" type="submit">
              {isPending && <i className="uil uil-spinner-alt text-2xl animate-spin"></i>}
              Create
            </Button>
            <Button type="button" id="btn-modal-close" className="hover:bg-slate-200 bg-white border text-textPrimary">
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
