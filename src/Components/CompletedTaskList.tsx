import { memo } from "react";
import { TaskType, statusObj } from "../Utilities/Models";
import Task from "./Task";
import "./TaskList.css";

interface CompletedTaskListProps {
  completedTaskList: TaskType[];
  changeStatus: (
    task: TaskType,
    from: keyof typeof statusObj,
    to: keyof typeof statusObj
  ) => void;
  deleteTask: (task: TaskType, from: keyof typeof statusObj) => void;
}

const CompletedTaskList = ({
  completedTaskList,
  changeStatus,
  deleteTask,
}: CompletedTaskListProps) => {
  return (
    <div className="task-area">
      <h1 className="completed">COMPLETED</h1>
      <div className="task-display-area">
        {completedTaskList.map((task, index) => {
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

export default memo(CompletedTaskList);
