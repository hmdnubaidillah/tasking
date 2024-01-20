"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { buttonsImportance, buttonsCategory } from "@/constant";
import moment from "moment";

export default function NewTaskModal({
  setTaskDialog,
}: {
  setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [btnImporatance, setBtnImporatance] = useState("");
  const [btnCategory, setBtnCategory] = useState("");
  const [loading, setLoading] = useState(false);

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
    formData.date = moment(formData.date).format("DD-MMM-YYYY");

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setTaskDialog(false);
      document.querySelector("body")?.classList.remove("overflow-hidden");
    }, 1000);
  }

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
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              value={formData.desc}
            />
          </div>

          <div>
            <h1 className="font-medium">Deadline</h1>
            <div className="mt-3">
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                value={formData.date}
                className="mr-5"
              />
              <input
                type="time"
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                value={formData.time}
              />
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
            <Button className="bg-primaryBlue hover:bg-primaryHoverBlue flex gap-2" type="submit">
              {loading && <i className="uil uil-spinner-alt text-2xl animate-spin"></i>}
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
