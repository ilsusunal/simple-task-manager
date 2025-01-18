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

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addTask, updateTaskStatus } from "@/lib/features/tasks/tasksSlice";
import type { Task } from "@/types/kanban";
import TaskCard from "./TaskCard";
import Button from "@/components/ui/Button";

const STATUSES: Task["status"][] = ["open", "in-progress", "review", "done"];

const labelMap: Record<Task["status"], string> = {
  open: "Open",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};

export default function KanbanBoard() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();

  const groupedTasks = STATUSES.map((status) => ({
    status,
    tasks: tasks.filter((t) => t.status === status),
  }));

  const sensors = useSensors(useSensor(MouseSensor));

  // * Updating the status of the task
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const draggedTaskId = active.id as string;
      const newStatus = over.id as Task["status"];

      dispatch(updateTaskStatus({ id: draggedTaskId, status: newStatus }));
    },
    [dispatch]
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
}

function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    const title = prompt("New task title?") || "Untitled Task";
    dispatch(
      addTask({
        title,
        description: "Lorem ipsum",
        dueDate: "01-01-2030",
        assignees: [],
        timeEstimation: 1,
        category: { name: "Uncategorized", color: "secondary" },
        status: "open",
        id: "",
      })
    );
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
