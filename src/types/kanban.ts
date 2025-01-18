export interface ProjectData {
  project: ProjectInfo;
  tasks: Task[];
  teams: Team[];
}

export interface ProjectInfo {
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
  dueDate: string;
  description: string;
  assignees: TeamMember[];
  timeEstimation: number;
  category: Category;
}

export interface Team {
  title: string;
  description: string;
  teamMambers: TeamMember[];
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
