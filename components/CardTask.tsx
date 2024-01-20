"use client";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tasks } from "@/constant";
import { buttonsImportance } from "@/constant";

export default function CardTask() {
  const [isTaskDone, setIsTaskDone] = useState(false);

  function handleTaskIsDone(id: number) {
    setIsTaskDone(true);
  }

  return (
    <>
      {Tasks.map((task, i) => (
        <div
          key={i}
          className={`${
            isTaskDone ? "opacity-50" : "opacity-100"
          } rounded-sm md:w-[70%] w-full bg-white h-fit border-[1.5px] border-gray-300 cursor-default transition-all`}
        >
          <div>
            <div className="border-b border-gray-300 p-4 flex items-center justify-between">
              <h1 className="sm:text-2xl text-xl font-semibold ">{task.category}</h1>
              <div className="sm:text-sm text-xs">
                <span className="font-medium">{task.date} </span>| <span className="font-bold">{task.time}</span>
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
                <Badge
                  style={{
                    background: `${task.importance == buttonsImportance[i].name && buttonsImportance[i].color}`,
                  }}
                  className="sm:text-sm text-xs rounded-md"
                >
                  {task.importance}
                </Badge>
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
                {/* <Button disabled={isTaskDone ? true : false} className="bg-slate-500 hover:bg-slate-400">
                  Pending
                </Button> */}
                <Button
                  disabled={isTaskDone ? true : false}
                  onClick={() => handleTaskIsDone(i)}
                  className="bg-green-500 hover:bg-green-400"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
