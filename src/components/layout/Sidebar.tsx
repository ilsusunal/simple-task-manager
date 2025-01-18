"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllProjects } from "@/lib/features/project/projectsSlice";
import Link from "next/link";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const {
    data: projects,
    status,
    error,
  } = useAppSelector((state) => state.projects);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllProjects());
    }
  }, [status, dispatch]);

  return (
    <section className="w-64 border-r-2 text-text flex flex-col">
      <div className="p-4 font-bold text-xl text-primary">
        Simple Task Manager
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2 py-4 px-8">
          <li className="font-semibold">Projects</li>
          {status === "loading" && <div>Loading projects...</div>}
          {status === "failed" && <div>Error: {error}</div>}
          {status === "succeeded" &&
            projects.map((proj) => (
              <li key={proj.project.id}>
                <Link href={`/project/${proj.project.id}`}>
                  {proj.project.title}
                </Link>
              </li>
            ))}

          <li>Teams</li>
        </ul>
      </nav>
    </section>
  );
}
