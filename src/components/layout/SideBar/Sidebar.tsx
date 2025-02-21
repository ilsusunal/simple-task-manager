"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllProjects } from "@/lib/features/project/projectsSlice";
import Link from "next/link";
import { fetchAllTeams } from "@/lib/features/teams/teamsSlicer";
import ProjectList from "./ProjectList";
import TeamList from "./TeamList";

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

  return (
    <section className="border-r-2 text-text flex flex-col w-min-72">
      <Link href="/">
        <div className="p-6 font-bold text-xl text-primary">
          Simple Task Manager
        </div>
      </Link>
      <nav>
        <ProjectList
          projects={projects}
          status={projectsStatus}
          error={projectsError}
        />
        <TeamList teams={teams} status={teamsStatus} error={teamsError} />
      </nav>
    </section>
  );
}
