import { Task } from "@/types/kanban";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    {
      id: "1",
      title: "Create a Kanban Board",
      status: "open",
      dueDate: "18-01-2025",
      description: "Create a kanban board using dnd-kit",
      assignees: [
        {
          id: "1",
          fullName: "İlsu Sunal",
          userName: "ilsu.sunal",
          avatar: {
            src: `https://avatar.iran.liara.run/public/girl?1`,
            alt: "İlsu Sunal",
            size: 40,
          },
          email: "random@random.com",
          title: "Frontend Developer",
        },
        {
          id: "2",
          fullName: "Alex Johnson",
          userName: "alex.johnson",
          avatar: {
            src: `https://avatar.iran.liara.run/public/2`,
            alt: "Alex Johnson",
            size: 40,
          },
          email: "alex@random.com",
          title: "Backend Developer",
        },
      ],
      timeEstimation: 10,
      category: { name: "Development", color: "neutral" },
    },
    {
      id: "2",
      title: "Set up Redux Store",
      status: "open",
      dueDate: "20-01-2025",
      description: "Configure Redux store for state management.",
      assignees: [
        {
          id: "2",
          fullName: "Alex Johnson",
          userName: "alex.johnson",
          avatar: {
            src: `https://avatar.iran.liara.run/public/2`,
            alt: "Alex Johnson",
            size: 40,
          },
          email: "alex@random.com",
          title: "Backend Developer",
        },
      ],
      timeEstimation: 5,
      category: { name: "Backend", color: "primary" },
    },
    {
      id: "3",
      title: "Implement Drag and Drop",
      status: "open",
      dueDate: "22-01-2025",
      description: "Use dnd-kit to implement drag and drop features.",
      assignees: [
        {
          id: "3",
          fullName: "Sara Lee",
          userName: "sara.lee",
          avatar: {
            src: `https://avatar.iran.liara.run/public/girl?3`,
            alt: "Sara Lee",
            size: 40,
          },
          email: "sara@random.com",
          title: "UI/UX Designer",
        },
      ],
      timeEstimation: 8,
      category: { name: "Frontend", color: "secondary" },
    },
    {
      id: "4",
      title: "Design Task Card UI",
      status: "open",
      dueDate: "23-01-2025",
      description: "Create a responsive task card design.",
      assignees: [
        {
          id: "4",
          fullName: "Mark Evans",
          userName: "mark.evans",
          avatar: {
            src: `https://avatar.iran.liara.run/public/4`,
            alt: "Mark Evans",
            size: 40,
          },
          email: "mark@random.com",
          title: "Graphic Designer",
        },
      ],
      timeEstimation: 4,
      category: { name: "Design", color: "background" },
    },
    {
      id: "5",
      title: "Add User Authentication",
      status: "open",
      dueDate: "25-01-2025",
      description: "Integrate user authentication with Firebase.",
      assignees: [
        {
          id: "5",
          fullName: "Emily Clark",
          userName: "emily.clark",
          avatar: {
            src: `https://avatar.iran.liara.run/public/girl?5`,
            alt: "Emily Clark",
            size: 40,
          },
          email: "emily@random.com",
          title: "Full Stack Developer",
        },
      ],
      timeEstimation: 6,
      category: { name: "Authentication", color: "neutral" },
    },
    {
      id: "6",
      title: "Deploy Application",
      status: "open",
      dueDate: "28-01-2025",
      description: "Deploy the app to Vercel.",
      assignees: [
        {
          id: "6",
          fullName: "John Doe",
          userName: "john.doe",
          avatar: {
            src: `https://avatar.iran.liara.run/public/6`,
            alt: "John Doe",
            size: 40,
          },
          email: "john@random.com",
          title: "DevOps Engineer",
        },
      ],
      timeEstimation: 3,
      category: { name: "Deployment", color: "secondary" },
    },
    {
      id: "7",
      title: "Write Documentation",
      status: "open",
      dueDate: "30-01-2025",
      description: "Document project setup and usage.",
      assignees: [
        {
          id: "7",
          fullName: "Anna Smith",
          userName: "anna.smith",
          avatar: {
            src: `https://avatar.iran.liara.run/public/girl?7`,
            alt: "Anna Smith",
            size: 40,
          },
          email: "anna@random.com",
          title: "Technical Writer",
        },
      ],
      timeEstimation: 5,
      category: { name: "Documentation", color: "neutral" },
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask: Task = {
        ...action.payload,
        id: crypto.randomUUID(),
        status: action.payload.status || "open",
      };
      state.tasks.push(newTask);
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: Task["status"] }>
    ) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = status;
      }
    },
  },
});

export const { addTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
