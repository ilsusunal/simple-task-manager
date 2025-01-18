"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addTask, updateTaskStatus } from "@/lib/features/tasks/tasksSlice";

export default function KanbanBoard() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(addTask({ title: "A new Task" }));
  };

  return (
    <div>
      <button onClick={handleAddTask}>+ Add Task</button>
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() =>
            dispatch(updateTaskStatus({ id: task.id, status: "done" }))
          }
        >
          {task.title} (Status: {task.status})
        </div>
      ))}
    </div>
  );
}
