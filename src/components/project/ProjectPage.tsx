"use client";

import React from "react";
import TabContainer from "@/components/ui/TabContainer";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import KanbanBoard from "@/components/project/KanbanBoard/KanbanBoard";
import type { ProjectData, Task, TeamMember } from "@/types/kanban";

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
    return <div>Loading project data...</div>;
  }

  const { project, tasks, team } = projectData;

  if (!team || !team.teamMembers) {
    return <div>No team data found in this project.</div>;
  }

  const OverviewTab = (
    <div className="text-sm">
      <h2 className="text-xl font-bold mb-2">Overview</h2>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>Due Date: {project.dueDate}</p>
    </div>
  );

  const KanbanTab = (
    <div className="text-sm">
      <KanbanBoard
        tasks={tasks}
        onUpdateTaskStatus={onUpdateTaskStatus}
        onAddTask={onAddTask}
        allTeamMembers={allTeamMembers}
      />
    </div>
  );

  const TeamTab = (
    <div className="text-sm">
      <h2 className="text-xl font-bold mb-2">{team.title}</h2>
      <p>{team.description}</p>
      <div className="flex gap-2 flex-wrap mt-4">
        {team.teamMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-2">
            <Avatar src={member.avatar.src} alt={member.avatar.alt} />
            <span>{member.fullName}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { label: "Overview", content: OverviewTab },
    { label: "Tasks", content: KanbanTab },
    { label: "Team", content: TeamTab },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm">
        <div className="flex gap-2 items-center">
          <i className={`${project.icon} text-xl`} />
          <span className="text-xl font-semibold">{project.title}</span>
        </div>
        <Button variant="primary" onClick={() => alert("Add member!")}>
          + Add Member
        </Button>
      </div>

      <TabContainer tabs={tabs} />
    </section>
  );
}
