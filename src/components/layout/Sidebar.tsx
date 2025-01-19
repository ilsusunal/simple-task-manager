"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllProjects } from "@/lib/features/project/projectsSlice";
import Link from "next/link";
import { fetchAllTeams } from "@/lib/features/teams/teamsSlicer";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";

export default function Sidebar() {
  const dispatch = useAppDispatch();

  const {
    data: projects,
    status: projectsStatus,
    error: projectsError,
  } = useAppSelector((state) => state.projects);

  const {
    data: teams,
    status: teamsStatus,
    error: teamsError,
  } = useAppSelector((state) => state.teams);

  useEffect(() => {
    if (projectsStatus === "idle") {
      dispatch(fetchAllProjects());
    }
    if (teamsStatus === "idle") {
      dispatch(fetchAllTeams());
    }
  }, [projectsStatus, teamsStatus, dispatch]);

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  return (
    <section className="border-r-2 text-text flex flex-col w-min-72">
      <div className="p-6 font-bold text-xl text-primary">
        Simple Task Manager
      </div>

      <nav>
        <ul className="space-y-2 py-4 px-6 mb-12">
          <li className="font-semibold mb-4 text-xl">Projects</li>
          {projectsStatus === "loading" && <div>Loading projects...</div>}
          {projectsStatus === "failed" && <div>Error: {projectsError}</div>}
          {projectsStatus === "succeeded" &&
            projects.map((proj) => (
              <li
                key={proj.project.id}
                className="font-semibold text-base border-2 rounded-md px-3 py-2 hover:border-primary active:border-primary w-60"
              >
                <Link href={`/project/${proj.project.id}`}>
                  <i className={`${proj.project.icon} mr-2`} />
                  {proj.project.title}
                </Link>
              </li>
            ))}
          <li>
            {" "}
            <Button variant="basic" onClick={() => {}}>
              + Add New Project
            </Button>
          </li>
        </ul>
        <ul className="space-y-2 py-4 px-6">
          <li className="font-semibold mb-4 text-xl">Teams</li>
          {teamsStatus === "loading" && <div>Loading teams...</div>}
          {teamsStatus === "failed" && <div>Error: {teamsError}</div>}
          {teamsStatus === "succeeded" &&
            teams.map((team) => (
              <li
                key={team.id}
                className="border-2 rounded-md px-3 py-2 hover:border-primary active:border-primary"
                onClick={() =>
                  setSelectedTeamId((prev) =>
                    prev === team.id ? null : team.id
                  )
                }
              >
                <p className="py-2 font-semibold">{team.title}</p>
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
      </nav>
    </section>
  );
}
