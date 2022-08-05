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
  const [showTasks, setshowTasks] = useState<boolean>(false);

  const userAuth = useAuth();

  useEffect(() => {
    statusObj[TODO].list = todoTaskList;
    statusObj[TODO].setFunc = settodoTaskList;
    statusObj[IN_PROGRESS].list = inProgressTaskList;
    statusObj[IN_PROGRESS].setFunc = setinProgressTaskList;
    statusObj[COMPLETED].list = completedTaskList;
    statusObj[COMPLETED].setFunc = setcompletedTaskList;
  }, [todoTaskList, inProgressTaskList, completedTaskList]);

  useEffect(() => {
    const setInitialTasks = async () => {
      if (userAuth) {
        const todo: TaskType[] = [];
        const progress: TaskType[] = [];
        const completed: TaskType[] = [];

        const dbTasks = await userAuth.getAllDocsDb();

        dbTasks.forEach((element: any) => {
          const task = element.data();
          if (task.status === TODO) todo.push(task);
          else if (task.status === IN_PROGRESS) progress.push(task);
          else if (task.status === COMPLETED) completed.push(task);
        });

        settodoTaskList(todo);
        setinProgressTaskList(progress);
        setcompletedTaskList(completed);
        setshowTasks(true);
      }
    };

    setInitialTasks();
  }, [userAuth]);

  const addTask = useCallback(
    async (task: TaskType) => {
      const newList = [...statusObj[TODO].list, task];
      statusObj[TODO].setFunc(newList);
      await userAuth?.addTaskDb(task);
    },
    [userAuth]
  );

  const changeStatus = useCallback(
    async (
      task: TaskType,
      from: keyof typeof statusObj,
      to: keyof typeof statusObj
    ) => {
      const temp1 = statusObj[from].list.filter((t) => t.id !== task.id);
      const newTask = { ...task, status: to };
      const temp2 = [...statusObj[to].list, newTask];

      statusObj[from].setFunc(temp1);
      statusObj[to].setFunc(temp2);

      await userAuth?.changeStatusDb(task, to);
    },
    [userAuth]
  );

  const deleteTask = useCallback(
    async (task: TaskType, from: keyof typeof statusObj) => {
      const temp1 = statusObj[from].list.filter((t) => t !== task);
      statusObj[from].setFunc(temp1);

      await userAuth?.deleteTaskDb(task);
    },
    [userAuth]
  );

  return (
    <div className="dashboard">
      <Header addTask={addTask} />
      <section className="task-area-container">
        <TodoTaskList
          todoTaskList={todoTaskList}
          changeStatus={changeStatus}
          deleteTask={deleteTask}
          showTasks={showTasks}
        />
        <InProgressTaskList
          inProgressTaskList={inProgressTaskList}
          changeStatus={changeStatus}
          deleteTask={deleteTask}
          showTasks={showTasks}
        />
        <CompletedTaskList
          completedTaskList={completedTaskList}
          changeStatus={changeStatus}
          deleteTask={deleteTask}
          showTasks={showTasks}
        />
      </section>
    </div>
  );
};

export default Dashboard;
