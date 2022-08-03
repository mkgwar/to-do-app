import { memo } from "react";
import Task from "./Task";
import "./TaskList.css";
import { TaskType, statusObj } from "../Models";

interface TodoTaskListProps {
  todoTaskList: TaskType[];
  changeStatus: (
    task: TaskType,
    from: keyof typeof statusObj,
    to: keyof typeof statusObj
  ) => void;
  deleteTask: (task: TaskType, from: keyof typeof statusObj) => void;
}

const TodoTaskList = ({
  todoTaskList,
  changeStatus,
  deleteTask,
}: TodoTaskListProps) => {
  return (
    <div className="task-area">
      <h1 className="todo">TO DO</h1>
      <div className="task-display-area">
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
      </div>
    </div>
  );
};

export default memo(TodoTaskList);
