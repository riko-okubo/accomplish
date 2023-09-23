import { createContext, useState } from "react";
import { Task, Tasks } from "../type/Types";

type TaskContextType = {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  tasks: Tasks;
  setTasks: React.Dispatch<React.SetStateAction<Tasks>>;
};

const TaskContext = createContext<TaskContextType>({
  task: {
    title: "",
    content: "",
    status: "todo",
    id: 0,
    memo: "",
  },
  setTask: () => null,
  tasks: [],
  setTasks: () => null,
});

const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [task, setTask] = useState<Task>({
    title: "",
    content: "",
    status: "todo",
    memo: "",
    id: 0,
  });
  const [tasks, setTasks] = useState<Tasks>([]);

  return (
    <TaskContext.Provider value={{ task, setTask, tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContextProvider, TaskContext };
