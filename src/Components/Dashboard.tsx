import "./Dashboard.css";
import { useState, useCallback, useEffect } from "react";
import Header from "./Header";
import TodoTaskList from "./TodoTaskList";
import InProgressTaskList from "./InProgressTaskList";
import CompletedTaskList from "./CompletedTaskList";
import { TaskType, statusObj } from "../Utilities/Models";
import { useAuth } from "../Utilities/UserContext";

export const TODO = "TODO";
export const IN_PROGRESS = "IN_PROGRESS";
export const COMPLETED = "COMPLETED";

const Dashboard = () => {
  const [todoTaskList, settodoTaskList] = useState<TaskType[]>([]);
  const [inProgressTaskList, setinProgressTaskList] = useState<TaskType[]>([]);
  const [completedTaskList, setcompletedTaskList] = useState<TaskType[]>([]);

  const userAuth = useAuth();

  useEffect(() => {
    statusObj[TODO].list = todoTaskList;
    statusObj[TODO].setFunc = settodoTaskList;
    statusObj[IN_PROGRESS].list = inProgressTaskList;
    statusObj[IN_PROGRESS].setFunc = setinProgressTaskList;
    statusObj[COMPLETED].list = completedTaskList;
    statusObj[COMPLETED].setFunc = setcompletedTaskList;
  }, [todoTaskList, inProgressTaskList, completedTaskList]);

  const addTask = useCallback((task: TaskType) => {
    const newList = [...statusObj[TODO].list, task];
    statusObj[TODO].setFunc(newList);
  }, []);

  const changeStatus = useCallback(
    (
      task: TaskType,
      from: keyof typeof statusObj,
      to: keyof typeof statusObj
    ) => {
      const temp1 = statusObj[from].list.filter((t) => t.id !== task.id);
      const newTask = { ...task, status: to };
      const temp2 = [...statusObj[to].list, newTask];

      statusObj[from].setFunc(temp1);
      statusObj[to].setFunc(temp2);
    },
    []
  );

  const deleteTask = useCallback(
    (task: TaskType, from: keyof typeof statusObj) => {
      const temp1 = statusObj[from].list.filter((t) => t !== task);
      statusObj[from].setFunc(temp1);
    },
    []
  );

  return (
    <div className="dashboard">
      <Header addTask={addTask} />
      <section className="task-area-container">
        <TodoTaskList
          todoTaskList={todoTaskList}
          changeStatus={changeStatus}
          deleteTask={deleteTask}
        />
        <InProgressTaskList
          inProgressTaskList={inProgressTaskList}
          changeStatus={changeStatus}
          deleteTask={deleteTask}
        />
        <CompletedTaskList
          completedTaskList={completedTaskList}
          changeStatus={changeStatus}
          deleteTask={deleteTask}
        />
      </section>
    </div>
  );
};

export default Dashboard;
