import { memo } from "react";
import "./TaskList.css";
import { TaskType, statusObj } from "../Utilities/Models";
import Task from "./Task";
import ShdaowTask from "./ShdaowTask";

interface InProgressTaskListProps {
  inProgressTaskList: TaskType[];
  changeStatus: (
    task: TaskType,
    from: keyof typeof statusObj,
    to: keyof typeof statusObj
  ) => void;
  deleteTask: (task: TaskType, from: keyof typeof statusObj) => void;
  showTasks: boolean;
}

const InProgressTaskList = ({
  inProgressTaskList,
  changeStatus,
  deleteTask,
  showTasks,
}: InProgressTaskListProps) => {
  return (
    <div className="task-area">
      <h1 className="in-progress">IN PROGRESS</h1>
      <div className="task-display-area">
        {!showTasks ? (
          <>
            {[...Array(2)].map((e, i) => (
              <ShdaowTask key={i} />
            ))}
          </>
        ) : (
          <>
            {inProgressTaskList.map((task, index) => {
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

export default memo(InProgressTaskList);
