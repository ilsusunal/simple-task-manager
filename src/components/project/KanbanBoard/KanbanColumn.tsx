"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { Task } from "@/types/kanban";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard";
import CustomLabel from "@/components/ui/CustomLabel";

const labelMap: Record<Task["status"], string> = {
  open: "Open",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};

interface KanbanColumnProps {
  status: Task["status"];
  tasks: Task[];
  onAddTask?: (columnStatus: Task["status"]) => void;
}

const KanbanColumn = ({ status, tasks, onAddTask }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const handleAddTask = () => {
    if (onAddTask) {
      onAddTask(status);
    }
  };

  let statusColor = "";

  switch (status) {
    case "open":
      statusColor += "bg-secondary";
      break;
    case "in-progress":
      statusColor += " bg-primary";
      break;
    case "review":
      statusColor += " bg-red-700";
      break;
    case "done":
      statusColor += "bg-lime-700";
      break;
    default:
      break;
  }

  const taskNumber = tasks.length;
  return (
    <div ref={setNodeRef} className="p-4 bg-gray-100 rounded">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2 items-center">
          <div className={`${statusColor} w-3 h-3 rounded-full`}></div>
          <h1 className="text-xl font-bold">{labelMap[status]}</h1>
        </div>
        <CustomLabel label={taskNumber.toString()} variant="basic" />
      </div>
      <Button className="my-4" variant="basic" onClick={handleAddTask}>
        + Add New Task
      </Button>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default KanbanColumn;
