import { useContext, createContext, useState, useEffect } from "react";
import { auth, db } from "./firebase-config";
import {
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { statusObj, TaskType } from "./Models";
import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

interface ContextValueType {
  user: User | null;
  login: Function;
  logout: Function;
  signup: Function;
  showForm: boolean;
  addTaskDb: Function;
  changeStatusDb: Function;
  deleteTaskDb: Function;
  getAllDocsDb: Function;
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

  const addTaskDb = (task: TaskType) => {
    if (user) {
      const dbRef = collection(db, user.uid);
      return setDoc(doc(dbRef, task.id), task);
    }
  };

  const changeStatusDb = (task: TaskType, to: keyof typeof statusObj) => {
    if (user) {
      const dbRef = collection(db, user.uid);
      return setDoc(doc(dbRef, task.id), { ...task, status: to });
    }
  };

  const deleteTaskDb = (task: TaskType) => {
    if (user) {
      const dbRef = collection(db, user.uid);
      return deleteDoc(doc(dbRef, task.id));
    }
  };

  const getAllDocsDb = () => {
    if (user) {
      const dbRef = collection(db, user.uid);
      return getDocs(dbRef);
    }
  };

  const value: ContextValueType = {
    user,
    login,
    logout,
    signup,
    showForm,
    addTaskDb,
    changeStatusDb,
    deleteTaskDb,
    getAllDocsDb,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export default UserContext;
