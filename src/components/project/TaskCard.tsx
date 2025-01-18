"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/types/kanban";
import CustomLabel from "../ui/CustomLabel";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
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

      {task.assignees.length > 0 && (
        <div className="mt-2 flex -space-x-4">
          {task.assignees.map((member, index) => (
            <img
              key={index}
              src={member.avatar.src || "/default-avatar.png"}
              alt={member.avatar.alt}
              style={{ width: member.avatar.size, height: member.avatar.size }}
              className="rounded-full border-2 border-primary"
            />
          ))}
        </div>
      )}
    </div>
  );
}
