export interface Task {
  id: string;
  title: string;
  status: "open" | "in-progress" | "review" | "done";
}
