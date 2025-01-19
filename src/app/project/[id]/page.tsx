"use client";

import React, { useCallback } from "react";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  updateTaskStatusInProject,
  saveProjectToMockAPI,
  addTaskInProject,
} from "@/lib/features/project/projectsSlice";
import type { Task, TeamMember } from "@/types/kanban";
import ProjectPage from "@/components/project/ProjectPage";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const projects = useAppSelector((state) => state.projects.data);
  const teams = useAppSelector((state) => state.teams.data);

  const allTeamMembers: TeamMember[] = teams.flatMap(
    (team) => team.teamMembers ?? []
  );

  const handleUpdateTaskStatus = useCallback(
    (taskId: string, newStatus: Task["status"]) => {
      dispatch(
        updateTaskStatusInProject({
          projectId: id as string,
          taskId,
          status: newStatus,
        })
      );
      dispatch(saveProjectToMockAPI(id as string));
    },
    [dispatch, id]
  );

  const handleAddTask = useCallback(
    (status: Task["status"], newTaskData: Omit<Task, "id">) => {
      dispatch(
        addTaskInProject({
          projectId: id as string,
          task: {
            ...newTaskData,
            status,
          },
        })
      );
      dispatch(saveProjectToMockAPI(id as string));
    },
    [dispatch, id]
  );

  const selectedProject = projects.find((p) => p.project.id === id);
  if (!selectedProject) {
    return <div>No project found for ID {id}</div>;
  }

  return (
    <ProjectPage
      projectData={selectedProject}
      onUpdateTaskStatus={handleUpdateTaskStatus}
      onAddTask={handleAddTask}
      allTeamMembers={allTeamMembers}
    />
  );
}
