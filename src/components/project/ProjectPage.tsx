"use client";

import React from "react";
import TabContainer from "@/components/ui/TabContainer";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import KanbanBoard from "@/components/project/KanbanBoard/KanbanBoard";
import type { ProjectData, Task, TeamMember } from "@/types/kanban";
import AvatarGroup from "./AvatarGroup";
import TeamPage from "./Team/TeamPage";
import OverviewPage from "./Overview/OverviewPage";

interface ProjectPageProps {
  projectData: ProjectData;
  onUpdateTaskStatus?: (taskId: string, newStatus: Task["status"]) => void;
  onAddTask?: (status: Task["status"], newTaskData: Omit<Task, "id">) => void;
  allTeamMembers?: TeamMember[];
}

export default function ProjectPage({
  projectData,
  onUpdateTaskStatus,
  onAddTask,
  allTeamMembers,
}: ProjectPageProps) {
  if (!projectData) {
    return <div>Loading...</div>;
  }

  const { project, tasks, team } = projectData;

  if (!team || !team.teamMembers) {
    return <div>No team data found in this project.</div>;
  }

  const OverviewTab = <OverviewPage project={project} />;

  const KanbanTab = (
    <KanbanBoard
      tasks={tasks}
      onUpdateTaskStatus={onUpdateTaskStatus}
      onAddTask={onAddTask}
      allTeamMembers={allTeamMembers}
    />
  );

  const TeamTab = <TeamPage team={team} />;

  const tabs = [
    { label: "Overview", content: OverviewTab },
    { label: "Tasks", content: KanbanTab },
    { label: "Team", content: TeamTab },
  ];

  return (
    <section>
      <div className="flex items-center justify-between p-8">
        <div className="flex gap-2 items-center">
          <i className={`${project.icon} text-xl`} />
          <span className="text-xl font-semibold">{project.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <AvatarGroup users={allTeamMembers ?? []} />
          <Button variant="primary" onClick={() => alert("Add member!")}>
            + Add Member
          </Button>
        </div>
      </div>

      <TabContainer tabs={tabs} />
    </section>
  );
}
