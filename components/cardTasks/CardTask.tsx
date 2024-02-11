"use client";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TaskType } from "@/types";
import { useGetUser } from "@/hooks/hook.user";
import SkeletonTaskCard from "../skeleton/SkeletonTaskCard";
import ImportanceBadge from "./ImportanceBadge";

export default function CardTask() {
  const [isTaskDone, setIsTaskDone] = useState(false);
  const { data, isPending } = useGetUser();
  const [tasks, setTasks] = useState<TaskType[]>([]);

  function handleTaskIsDone(id: string) {
    const task = tasks.find((e) => e.id === id);

    localStorage.setItem(task?.id!, JSON.stringify({ ...task, isDone: true, isOngoing: false }));

    // setIsTaskDone(true);
    console.log(typeof task?.id);
  }

  useEffect(() => {
    setTasks(data?.data.user.tasks);
  }, [data?.data.user.tasks]);

  return (
    <>
      {data?.data.user.tasks.length < 1 ? (
        <div className="rounded-sm bg-white h-[200px] border-[1.5px] border-gray-300 cursor-default transition-all mb-3 grid place-content-center text-textPrimary">
          <h1 className="text-2xl font-medium">You have no tasks yey!</h1>
        </div>
      ) : (
        <>
          {isPending ? (
            <SkeletonTaskCard />
          ) : (
            data?.data.user.tasks.map((task: TaskType, i: number) => (
              <div
                key={task.name}
                className={`${
                  isTaskDone ? "opacity-50" : "opacity-100"
                } rounded-sm bg-white h-fit border-[1.5px] border-gray-300 cursor-default transition-all mb-3`}
              >
                <>
                  <div className="border-b border-gray-300 p-4 flex items-center justify-between">
                    <h1 className="sm:text-2xl text-xl font-semibold ">{task.category}</h1>
                    <div className="sm:text-sm text-xs">
                      <span className="font-medium">
                        {task.dateDl === null ? "No Dateline" : "Dateline : " + task.dateDl}
                      </span>
                    </div>
                  </div>

                  {/* title and desc */}
                  <div className="border-b border-gray-300 p-4">
                    <h1 className="sm:text-xl text-lg font-medium mb-2">{task.name}</h1>
                    <p className="sm:text-base text-sm">{task.desc}</p>
                  </div>

                  {/* badges */}
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex sm:flex-row flex-col max-sm:items-start max-sm:w-[60%] gap-2">
                      <ImportanceBadge importance={task.importance} />
                      <Badge
                        className={`${
                          isTaskDone ? "bg-primaryBlue hover:bg-primaryBlue" : "bg-amber-500 hover:bg-amber-500"
                        } sm:text-sm text-xs rounded-md`}
                      >
                        {isTaskDone ? "Done" : "On Going"}
                      </Badge>
                    </div>

                    {/* buttons */}
                    <div className="flex items-center gap-2">
                      <Button disabled={isTaskDone ? true : false} className="bg-primaryBlue hover:bg-primaryHoverBlue">
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleTaskIsDone(task.id!)}
                        disabled={isTaskDone ? true : false}
                        className="bg-green-500 hover:bg-green-400"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
}
