"use client";

import React, { useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { Task } from "@/types/kanban";
import TaskCard from "../TaskCard";
import Button from "@/components/ui/Button";

const STATUSES: Task["status"][] = ["open", "in-progress", "review", "done"];

const labelMap: Record<Task["status"], string> = {
  open: "Open",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTaskStatus?: (taskId: string, newStatus: Task["status"]) => void;
  onAddTask?: (columnStatus: Task["status"]) => void;
}

export default function KanbanBoard({
  tasks,
  onUpdateTaskStatus,
  onAddTask,
}: KanbanBoardProps) {
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
      onUpdateTaskStatus(draggedTaskId, newStatus);
    },
    [onUpdateTaskStatus]
  );

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
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
}

interface KanbanColumnProps {
  status: Task["status"];
  tasks: Task[];
  onAddTask?: (columnStatus: Task["status"]) => void;
}

function KanbanColumn({ status, tasks, onAddTask }: KanbanColumnProps) {
  const handleAddTask = () => {
    if (onAddTask) {
      onAddTask(status);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h1 className="text-xl font-bold mb-2">{labelMap[status]}</h1>
      <Button className="my-4" variant="basic" onClick={handleAddTask}>
        + Add New Task
      </Button>
      <SortableContext
        id={status}
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}
