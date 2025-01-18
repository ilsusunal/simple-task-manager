"use client";

import React, { useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Task } from "@/types/kanban";
import KanbanColumn from "./KanbanColumn";

const STATUSES: Task["status"][] = ["open", "in-progress", "review", "done"];

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTaskStatus?: (taskId: string, newStatus: Task["status"]) => void;
  onAddTask?: (columnStatus: Task["status"]) => void;
}

const KanbanBoard = ({
  tasks,
  onUpdateTaskStatus,
  onAddTask,
}: KanbanBoardProps) => {
  const groupedTasks = STATUSES.map((status) => ({
    status,
    tasks: tasks.filter((t) => t.status === status),
  }));

  const sensors = useSensors(useSensor(MouseSensor));

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || !onUpdateTaskStatus) return;

      const draggedTaskId = active.id as string;
      const newStatus = over.id as Task["status"];

      console.log("Dragged Task ID:", draggedTaskId, "Over:", newStatus);

      onUpdateTaskStatus(draggedTaskId, newStatus);
    },
    [onUpdateTaskStatus]
  );

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {groupedTasks.map((column) => (
            <KanbanColumn
              key={column.status}
              status={column.status}
              tasks={column.tasks}
              onAddTask={onAddTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
