"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { buttonsImportance, buttonsCategory } from "@/constant";

export default function NewTaskModal({
  setTaskDialog,
}: {
  setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const modalContainer = useRef(null);
  const [btnImporatance, setBtnImporatance] = useState("");
  const [btnCategory, setBtnCategory] = useState("");

  const [formData, setFormData] = useState({
    taskName: "",
    desc: "",
    date: "",
    time: "",
    category: "",
    importance: "",
  });

  function handleCreateNewTask(e: React.FormEvent) {
    e.preventDefault();
  }

  useEffect(() => {
    const body = document.querySelector("body");

    window.onclick = (event) => {
      const target = event.target as HTMLElement;

      if (target.matches("#modal-container") || target.matches("#btn-modal-close")) {
        setTaskDialog(false);
        body?.classList.remove("overflow-hidden");
        return;
      }

      setTaskDialog(true);
      body?.classList.add("overflow-hidden");
    };
  }, [setTaskDialog]);

  return (
    <div
      id="modal-container"
      ref={modalContainer}
      className="fixed top-0 left-0 z-20 grid place-content-center w-full h-screen bg-[rgba(0,0,0,.5)] transition-all"
    >
      <div className="bg-white rounded-md text-textPrimary w-fit">
        <div className="border-b w-full">
          <h1 className="text-xl font-medium mx-5 my-3">Create Task</h1>
        </div>

        <form onSubmit={handleCreateNewTask} className="p-5 flex flex-col gap-5">
          <div>
            <Input
              type="text"
              placeholder="Task Name"
              onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
              value={formData.taskName}
            />
          </div>

          <div>
            <Textarea
              placeholder="Description..."
              className="resize-none"
              onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
              value={formData.taskName}
            />
          </div>

          <div>
            <h1 className="font-medium">Deadline</h1>
            <div className="mt-3">
              <input type="date" className="mr-5" />
              <input type="time" />
            </div>
          </div>

          <div>
            <h1 className="font-medium">Category</h1>
            <div className="flex flex-wrap gap-5 mt-3">
              {buttonsCategory.map((button, i) => (
                <Button
                  key={i}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, category: button.name });
                    setBtnCategory(button.name);
                  }}
                  className={`${
                    btnCategory == button.name
                      ? "bg-slate-800 hover:bg-slate-800 text-white"
                      : "bg-white hover:bg-white text-textPrimary"
                  }  border `}
                >
                  {button.name}
                </Button>
              ))}
            </div>
          </div>

          {/* importance */}
          <div>
            <h1 className="font-medium">Importance</h1>
            <div className="sm:flex grid grid-rows-2 grid-cols-2 sm:gap-5 gap-2 mt-3">
              {buttonsImportance.map((button, i: number) => (
                <Button
                  type="button"
                  key={i}
                  onClick={() => {
                    setFormData({ ...formData, importance: button.name });
                    setBtnImporatance(button.name);
                  }}
                  style={{
                    backgroundColor: btnImporatance == button.name ? "rgb(30 41 59)" : button.color,
                  }}
                >
                  {button.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-5 justify-end">
            <Button className="bg-primaryBlue hover:bg-primaryHoverBlue" type="submit">
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
