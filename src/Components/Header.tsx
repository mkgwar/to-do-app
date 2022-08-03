import React, { memo, useRef, useState } from "react";
import { TODO } from "../App";
import { TaskType } from "../Models";
import "./Header.css";

interface HeaderProps {
  addTask: (task: TaskType) => void;
}

const Header = ({ addTask }: HeaderProps) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [showWarning, setshowWarning] = useState<boolean>(false);

  const submitHandler = () => {
    if (inputElement.current) {
      const taskTitle: string = inputElement.current.value.trim();

      if (taskTitle === "") {
        if (!showWarning) setshowWarning(true);
      } else {
        inputElement.current.value = "";
        if (showWarning) setshowWarning(false);
        const tempTask: TaskType = {
          id: Date.now(),
          title: taskTitle,
          status: TODO,
        };
        addTask(tempTask);
      }
    }
  };

  const keyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitHandler();
    }
  };

  return (
    <header>
      <div className="logo">
        <h3>MKGWAR's</h3>
        <h1>TO DO</h1>
      </div>
      <div className="add-task-container">
        <input
          ref={inputElement}
          type="text"
          placeholder="Enter Task"
          className={showWarning ? "warning" : ""}
          onKeyDown={keyDownHandler}
        />
        <button onClick={submitHandler}>Add Task</button>
      </div>
    </header>
  );
};

export default memo(Header);
