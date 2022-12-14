import { memo } from "react";
import "./Task.css";
import { TODO, IN_PROGRESS, COMPLETED } from "./Dashboard";
import { TaskType, statusObj } from "../Utilities/Models";

interface TaskProps {
  task: TaskType;
  changeStatus: (
    task: TaskType,
    from: keyof typeof statusObj,
    to: keyof typeof statusObj
  ) => void;
  deleteTask: (task: TaskType, from: keyof typeof statusObj) => void;
}

const DELETE = "DELETE";

const Task = ({ task, changeStatus, deleteTask }: TaskProps) => {
  const clickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;

    if (target.id === TODO) {
      changeStatus(task, task.status, target.id);
    } else if (target.id === IN_PROGRESS) {
      changeStatus(task, task.status, target.id);
    } else if (target.id === COMPLETED) {
      changeStatus(task, task.status, target.id);
    } else if (target.id === DELETE) deleteTask(task, task.status);
  };

  return (
    <div className="task" onClick={clickHandler}>
      <div className="text-and-delete">
        <span className="task-title">{task.title}</span>
        <div className="img-container">
          <img
            className="delete"
            title="Delete"
            alt="delete"
            id={DELETE}
            src="/Resources/Icons/delete.svg"
          />
        </div>
      </div>
      <Icons task={task} />
    </div>
  );
};

const Icons = ({ task }: { task: TaskType }) => {
  if (task.status === TODO) {
    return (
      <div className="change-status-container">
        <div className="img-container">
          <img
            src="/Resources/Icons/inProgress.png"
            title="In Progress"
            alt="In Progress"
            id={IN_PROGRESS}
          />
        </div>
        <div className="img-container">
          <img
            src="/Resources/Icons/complete.png"
            title="Completed"
            alt="Completed"
            id={COMPLETED}
          />
        </div>
      </div>
    );
  } else if (task.status === IN_PROGRESS) {
    return (
      <div className="change-status-container">
        <div className="img-container">
          <img
            src="/Resources/Icons/todo.png"
            title="To Do"
            alt="To Do"
            id={TODO}
          />
        </div>
        <div className="img-container">
          <img
            src="/Resources/Icons/complete.png"
            title="Completed"
            alt="Completed"
            id={COMPLETED}
          />
        </div>
      </div>
    );
  }

  if (task.status === COMPLETED) {
    return (
      <div className="change-status-container">
        <div className="img-container">
          <img
            src="/Resources/Icons/todo.png"
            title="To Do"
            alt="To Do"
            id={TODO}
          />
        </div>
        <div className="img-container">
          <img
            src="/Resources/Icons/inProgress.png"
            title="In Progress"
            alt="In Progress"
            id={IN_PROGRESS}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default memo(Task);
