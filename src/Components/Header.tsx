import React, { memo, useRef, useState } from "react";
import { TODO } from "./Dashboard";
import { TaskType } from "../Utilities/Models";
import "./Header.css";
import { useAuth } from "../Utilities/UserContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface HeaderProps {
  addTask: (task: TaskType) => void;
}

const Header = ({ addTask }: HeaderProps) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [showWarning, setshowWarning] = useState<boolean>(false);

  const userAuth = useAuth();

  const submitHandler = () => {
    if (inputElement.current) {
      const taskTitle: string = inputElement.current.value.trim();

      if (taskTitle === "") {
        if (!showWarning) setshowWarning(true);
      } else {
        inputElement.current.value = "";
        if (showWarning) setshowWarning(false);
        const tempTask: TaskType = {
          id: uuidv4(),
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
      <div className="top">
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
      </div>
      <div className="user-details">
        <span className="email">Welcome {userAuth?.user?.email}</span>
        <Link to="/" onClick={() => userAuth?.logout()}>
          Sign out
        </Link>
      </div>
    </header>
  );
};

export default memo(Header);
