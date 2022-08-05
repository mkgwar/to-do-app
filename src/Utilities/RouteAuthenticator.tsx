import { Navigate } from "react-router-dom";
import { useAuth } from "./UserContext";

interface RouteAuthenticatorProps {
  children: React.ReactNode;
}

const RouteAuthenticator = ({ children }: RouteAuthenticatorProps) => {
  const userAuth = useAuth();
  if (userAuth && userAuth.user === null) {
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
};

export default RouteAuthenticator;
