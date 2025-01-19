"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllProjects } from "@/lib/features/project/projectsSlice";
import Link from "next/link";
import { fetchAllTeams } from "@/lib/features/teams/teamsSlicer";

export default function Sidebar() {
  const dispatch = useAppDispatch();

  // 1) Grab project data
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

  return (
    <section className="w-64 border-r-2 text-text flex flex-col">
      <div className="p-4 font-bold text-xl text-primary">
        Simple Task Manager
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2 py-4 px-8">
          <li className="font-semibold">Projects</li>
          {projectsStatus === "loading" && <div>Loading projects...</div>}
          {projectsStatus === "failed" && <div>Error: {projectsError}</div>}
          {projectsStatus === "succeeded" &&
            projects.map((proj) => (
              <li key={proj.project.id}>
                <Link href={`/project/${proj.project.id}`}>
                  {proj.project.title}
                </Link>
              </li>
            ))}

          <li className="mt-6 font-semibold">Teams</li>
          {teamsStatus === "loading" && <div>Loading teams...</div>}
          {teamsStatus === "failed" && <div>Error: {teamsError}</div>}
          {teamsStatus === "succeeded" &&
            teams.map((team) => <li key={team.id}>{team.title}</li>)}
        </ul>
      </nav>
    </section>
  );
}
