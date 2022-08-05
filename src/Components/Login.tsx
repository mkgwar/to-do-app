import "./Form.css";
import { useState, useRef } from "react";
import { useAuth } from "../Utilities/UserContext";
import { Link, Navigate } from "react-router-dom";

interface MessageObjectType {
  message: string;
  status: string;
}

const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

const emptyWarningMessage = { message: "", status: ERROR };

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setisDisabled] = useState<boolean>(false);
  const [showMessage, setshowMessage] =
    useState<MessageObjectType>(emptyWarningMessage);

  const userAuth = useAuth();

  if (userAuth?.user !== null) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  const submitHandler = async () => {
    if (emailRef.current && passwordRef.current) {
      setisDisabled(true);

      setshowMessage({
        message: "Logging in.",
        status: SUCCESS,
      });

      try {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await userAuth?.login(email, password);
      } catch (err: any) {
        setshowMessage({
          message: err.message,
          status: ERROR,
        });
        setisDisabled(false);
      }
    } else {
      setshowMessage({
        message: "Some error occurred. Please try again.",
        status: ERROR,
      });
      setisDisabled(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-inside-container">
        <div className="logo">
          <h3>MKGWAR's</h3>
          <h1>TO DO</h1>
        </div>
        {userAuth?.showForm && (
          <>
            <div className="form-box">
              <input type="email" ref={emailRef} placeholder="Enter email" />
              <input
                type="password"
                ref={passwordRef}
                placeholder="Enter password"
              />
              <span className={`success-error-text ${showMessage.status}`}>
                {showMessage.message}
              </span>
              <button disabled={isDisabled} onClick={submitHandler}>
                LOG IN
              </button>
            </div>
            <div className="bottom-text">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
