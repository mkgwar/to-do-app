import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "./firebase-config";
import {
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
} from "firebase/auth";

interface ContextValueType {
  user: User | null;
  login: Function;
  logout: Function;
  signup: Function;
  showForm: boolean;
}

const authContext = createContext<ContextValueType | null>(null);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setuser] = useState<User | null>(null);
  const [showForm, setshowForm] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setshowForm(false);
        setuser(user);
      } else {
        setshowForm(true);
        setuser(null);
      }
    });

    return unsubscribe;
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const value: ContextValueType = {
    user,
    login,
    logout,
    signup,
    showForm,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export default UserContext;
