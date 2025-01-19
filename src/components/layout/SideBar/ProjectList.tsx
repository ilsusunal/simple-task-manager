"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ProjectData } from "@/types/kanban";
import { usePathname } from "next/navigation";

export default function ProjectList({
  projects,
  status,
  error,
}: {
  projects: ProjectData[];
  status: string;
  error: string | null;
}) {
  const pathname = usePathname();
  const selectedProjectId = pathname.split("/")[2];

  return (
    <ul className="space-y-2 py-4 px-6 mb-12">
      <li className="font-semibold mb-4 text-xl">Projects</li>
      {status === "loading" && <div>Loading projects...</div>}
      {status === "failed" && <div>Error: {error}</div>}
      {status === "succeeded" &&
        projects.map((project) => (
          <li
            key={project.project.id}
            className={`font-semibold text-base border-2 rounded-md px-3 py-2 hover:bg-accent hover:border-accent w-60 ${
              selectedProjectId === project.project.id
                ? "bg-primary border-primary text-white"
                : ""
            }`}
          >
            <Link href={`/project/${project.project.id}`}>
              <i
                className={`${project.project.icon} ${
                  Number(project.project.id) % 2 === 0
                    ? "bg-secondary"
                    : "bg-orange-200"
                } p-1 rounded mr-2`}
              />
              {project.project.title}
            </Link>
          </li>
        ))}
      <li>
        <Button variant="basic" onClick={() => {}}>
          + Add New Project
        </Button>
      </li>
    </ul>
  );
}
