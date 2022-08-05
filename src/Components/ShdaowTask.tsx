import "./Task.css";

const ShdaowTask = () => {
  return (
    <div className="task">
      <div className="text-and-delete">
        <div className="shadow-text-container">
          <span className="task-title shadow"></span>
          <span className="task-title shadow"></span>
        </div>
        <div className="img-container shadow"></div>
      </div>
      <div className="change-status-container">
        <div className="img-container shadow"></div>
        <div className="img-container shadow"></div>
      </div>
    </div>
  );
};

export default ShdaowTask;
