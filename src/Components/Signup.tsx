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

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setisDisabled] = useState<boolean>(false);
  const [showMessage, setshowMessage] =
    useState<MessageObjectType>(emptyWarningMessage);

  const userAuth = useAuth();

  if (userAuth?.user !== null) {
    return <Navigate to="/" />;
  }

  const submitHandler = async () => {
    if (emailRef.current && passwordRef.current && confirmPasswordRef.current) {
      setisDisabled(true);

      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (password !== confirmPassword) {
        setshowMessage({
          message: "Password do not match.",
          status: ERROR,
        });
        setisDisabled(false);
      } else {
        setshowMessage({
          message: "Signing up",
          status: SUCCESS,
        });

        try {
          await userAuth?.signup(email, password);
        } catch (err: any) {
          setshowMessage({
            message: err.message,
            status: ERROR,
          });
          setisDisabled(false);
        }
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
              <input
                type="password"
                ref={confirmPasswordRef}
                placeholder="Confirm password"
              />
              <span className={`success-error-text ${showMessage.status}`}>
                {showMessage.message}
              </span>
              <button disabled={isDisabled} onClick={submitHandler}>
                SIGN UP
              </button>
            </div>
            <div className="bottom-text">
              Already have an account? <Link to="/">Log In</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
