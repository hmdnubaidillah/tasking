"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import NewTaskModal from "@/components/modals/NewTaskModal";

export default function Nav() {
  const [taskDialog, setTaskDialog] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-[0px_1px_14px_rgba(0,0,0,0.15)]">
      <div className="sm:w-[80%] w-[90%] m-auto flex justify-between items-center sm:py-5 py-3 text-textPrimary transition-all">
        <div className="flex items-center gap-5">
          <h1 className="font-medium sm:text-2xl">Tasking</h1>

          <Input
            type="text"
            placeholder="Find task..."
            className="font-normal text-textPrimary placeholder:font-normal max-sm:placeholder:text-sm w-[300px] sm:block hidden"
          />
        </div>
        <div className="max-sm:flex gap-3 items-center">
          {/* mobile search bar */}
          <Input
            type="text"
            placeholder="Find task..."
            className="font-normal outline-none text-textPrimary placeholder:font-normal max-sm:placeholder:text-sm w-[120px] sm:hidden block"
          />
          {/* end mobile search bar */}

          <Button
            size={"default"}
            onClick={() => setTaskDialog((prev) => !prev)}
            className="font-medium bg-primaryBlue hover:bg-primaryHoverBlue transition-all text-white sm:text-base text-sm"
            type="button"
          >
            <i className="uil uil-plus sm:mr-1 mr-0" /> <span className="max-sm:hidden">Create Task</span>
          </Button>
        </div>
      </div>
      {taskDialog && <NewTaskModal setTaskDialog={setTaskDialog} />}
    </nav>
  );
}
