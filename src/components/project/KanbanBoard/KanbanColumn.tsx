"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Task, TeamMember } from "@/types/kanban";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard";
import CustomLabel from "@/components/ui/CustomLabel";
import TaskFormModal from "../TaskFormModal";

const labelMap: Record<Task["status"], string> = {
  open: "Open",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};

interface KanbanColumnProps {
  status: Task["status"];
  tasks: Task[];
  onAddTask?: (status: Task["status"], newTask: Omit<Task, "id">) => void;
  teamMembers?: TeamMember[];
  activeId: string | null;
}

const KanbanColumn = ({
  status,
  tasks,
  onAddTask,
  teamMembers = [],
  activeId,
}: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveTask = (newTaskData: Omit<Task, "id">) => {
    if (onAddTask) {
      onAddTask(status, newTaskData);
    }
    handleCloseModal();
  };

  const taskNumber = tasks.length;

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

  return (
    <div ref={setNodeRef} className="p-4">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2 items-center">
          <div className={`${statusColor} w-3 h-3 rounded-full`}></div>
          <h1 className="text-xl font-bold">{labelMap[status]}</h1>
        </div>
        <CustomLabel label={taskNumber.toString()} variant="basic" />
      </div>
      <Button className="my-4" variant="basic" onClick={handleOpenModal}>
        + Add New Task
      </Button>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} isActive={activeId === task.id} />
      ))}

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        status={status}
        teamMembers={teamMembers}
      />
    </div>
  );
};

export default KanbanColumn;
