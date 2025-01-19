export interface PageData {
  projects: ProjectData[];
  teams: Team[];
}

export interface ProjectData {
  id: string;
  project: Project;
  team: Team;
  tasks: Task[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  icon: string;
}

export interface Task {
  id: string;
  title: string;
  status: "open" | "in-progress" | "review" | "done";
  startDate: string;
  dueDate: string;
  description: string;
  assignees: TeamMember[];
  timeEstimation: number;
  category: Category;
}

export interface Team {
  id: string;
  title: string;
  description: string;
  teamMembers: TeamMember[];
}

export interface TeamMember {
  id: string;
  fullName: string;
  userName: string;
  avatar: Avatar;
  email: string;
  title: string;
}

export interface Avatar {
  src: string;
  alt: string;
  size: number;
}

export interface Category {
  name: string;
  color: string;
}
