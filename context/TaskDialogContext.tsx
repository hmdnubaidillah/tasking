"use client";
import React from "react";
import { createContext, useState } from "react";

interface TaskDialogContextType {
  taskDialog: boolean;
  setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskDialogContext = createContext<TaskDialogContextType | null>(null);

export default function TaskDialogProvider({ children }: { children: React.ReactNode }) {
  const [taskDialog, setTaskDialog] = useState(false);

  return <TaskDialogContext.Provider value={{ taskDialog, setTaskDialog }}>{children}</TaskDialogContext.Provider>;
}
