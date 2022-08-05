import { memo } from "react";
import Task from "./Task";
import "./TaskList.css";
import { TaskType, statusObj } from "../Utilities/Models";
import ShdaowTask from "./ShdaowTask";

interface TodoTaskListProps {
  todoTaskList: TaskType[];
  changeStatus: (
    task: TaskType,
    from: keyof typeof statusObj,
    to: keyof typeof statusObj
  ) => void;
  deleteTask: (task: TaskType, from: keyof typeof statusObj) => void;
  showTasks: boolean;
}

const TodoTaskList = ({
  todoTaskList,
  changeStatus,
  deleteTask,
  showTasks,
}: TodoTaskListProps) => {
  return (
    <div className="task-area">
      <h1 className="todo">TO DO</h1>
      <div className="task-display-area">
        {!showTasks ? (
          <>
            {[...Array(3)].map((e, i) => (
              <ShdaowTask key={i} />
            ))}
          </>
        ) : (
          <>
            {todoTaskList.map((task, index) => {
              return (
                <Task
                  task={task}
                  key={index}
                  changeStatus={changeStatus}
                  deleteTask={deleteTask}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(TodoTaskList);
