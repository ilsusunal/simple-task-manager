import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Team } from "@/types/kanban";
import React, { useState } from "react";

export default function TeamList({
  teams,
  status,
  error,
}: {
  teams: Team[];
  status: string;
  error: string | null;
}) {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  return (
    <ul className="space-y-2 py-4 px-6">
      <li className="font-semibold mb-4 text-xl">Teams</li>
      {status === "loading" && <div>Loading teams...</div>}
      {status === "failed" && <div>Error: {error}</div>}
      {status === "succeeded" &&
        teams.map((team) => (
          <li
            key={team.id}
            className={` ${
              selectedTeamId === team.id
                ? "border-2 border-primary"
                : "border-2"
            } rounded-md px-3 py-2 hover:border-primary active:border-primary cursor-pointer`}
            onClick={() =>
              setSelectedTeamId((prev) => (prev === team.id ? null : team.id))
            }
          >
            <div className="flex items-center justify-between">
              <p className="py-2 font-semibold">{team.title}</p>
              {selectedTeamId === team.id ? (
                <i className="ri-arrow-up-s-line" />
              ) : (
                <i className="ri-arrow-down-s-line" />
              )}
            </div>
            {selectedTeamId === team.id &&
              team.teamMembers.map((member) => (
                <div className="flex flex-col" key={member.id}>
                  <div className="flex items-center gap-4 border-b py-2">
                    <Avatar src={member.avatar.src} size={40} />
                    <p>{member.fullName}</p>
                  </div>
                </div>
              ))}
          </li>
        ))}
      <li>
        <Button variant="basic" onClick={() => {}}>
          + Add New Team
        </Button>
      </li>
    </ul>
  );
}
