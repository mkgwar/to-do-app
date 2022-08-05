import Dashboard from "./Components/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteAuthenticator from "./Utilities/RouteAuthenticator";
import UserContext from "./Utilities/UserContext";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

const App = () => {
  return (
    <UserContext>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <RouteAuthenticator>
              <Dashboard />
            </RouteAuthenticator>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </UserContext>
  );
};

export default App;
