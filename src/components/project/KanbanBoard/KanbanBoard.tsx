"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Task, TeamMember } from "@/types/kanban";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "../TaskCard";

const STATUSES: Task["status"][] = ["open", "in-progress", "review", "done"];

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTaskStatus?: (taskId: string, newStatus: Task["status"]) => void;
  onAddTask?: (status: Task["status"], newTaskData: Omit<Task, "id">) => void;
  allTeamMembers?: TeamMember[];
}

const KanbanBoard = ({
  tasks,
  onUpdateTaskStatus,
  onAddTask,
  allTeamMembers,
}: KanbanBoardProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(MouseSensor));

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (onUpdateTaskStatus && over) {
      onUpdateTaskStatus(active.id as string, over.id as Task["status"]);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-4 gap-4">
        {STATUSES.map((status) => {
          const columnTasks = tasks.filter((t) => t.status === status);
          return (
            <KanbanColumn
              key={status}
              status={status}
              tasks={columnTasks}
              activeId={activeId}
              onAddTask={onAddTask}
              teamMembers={allTeamMembers}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeId ? (
          <TaskCard task={tasks.find((t) => t.id === activeId)!} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
