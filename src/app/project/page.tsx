"use client";
import React from "react";
import TabContainer from "@/components/ui/TabContainer";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";

export default function ProjectPage() {
  const teamMembers = [
    { id: 1, name: "Alice", avatar: "/default-avatar.png" },
    { id: 2, name: "Bob", avatar: "/default-avatar.png" },
    { id: 3, name: "Charlie", avatar: "/default-avatar.png" },
  ];

  const OverviewTab = (
    <div className="text-sm">
      <h2 className="text-xl font-bold mb-2">Overview</h2>
      <p>project dashboard</p>
    </div>
  );

  const KanbanTab = (
    <div className="text-sm">
      <h2 className="text-xl font-bold mb-2">Tasks</h2>
      <p>kanban</p>
    </div>
  );

  const TeamTab = (
    <div className="text-sm">
      <h2 className="text-xl font-bold mb-2">Team Members</h2>
      <p>team cards</p>
    </div>
  );

  const tabs = [
    { label: "Overview", content: OverviewTab },
    { label: "Kanban", content: KanbanTab },
    { label: "Team", content: TeamTab },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm">
        <div className="flex items-center space-x-2">
          {teamMembers.map((member) => (
            <Avatar key={member.id} src={member.avatar} alt={member.name} />
          ))}
        </div>
        <Button variant="primary" onClick={() => alert("Add member ")}>
          + Add Member
        </Button>
      </div>

      <TabContainer tabs={tabs} />
    </div>
  );
}
