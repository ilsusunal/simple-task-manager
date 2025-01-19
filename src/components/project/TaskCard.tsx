"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/types/kanban";
import CustomLabel from "../ui/CustomLabel";
import AvatarGroup from "./AvatarGroup";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-md p-3 shadow-sm mb-2 cursor-move border-2"
    >
      <section className="flex justify-between items-center gap-2">
        <CustomLabel label={task.dueDate} variant="red" icon="calendar-line" />
        <CustomLabel
          label={`${task.timeEstimation.toString()} points`}
          variant="primary"
        />
      </section>
      <section className="flex flex-col gap-2 items-start my-4">
        <h3 className="font-semibold text-base">{task.title}</h3>
        <p className="text-sm text-neutral-700 mt-1">{task.description}</p>
      </section>
      <div className="border-b-2 my-4"></div>

      <section className="flex justify-between items-center">
        <AvatarGroup users={task.assignees} maxCount={2} />
        <button>
          <i className="ri-edit-box-line text-xl font-bold text-gray-400 hover:text-primary" />
        </button>
      </section>
    </div>
  );
}
