import "../App.css";
import "../style.css";
import { TodolistList } from "../features/todolist-list/ui/TodolistList.tsx";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login/Login.tsx";
import Page404 from "../pages/Page404/Page404.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "../common/hooks/reduxHook.ts";
import { authActions } from "auth/authSlice.ts";
import { useAppSelector } from "./store.ts";
import { Sceleton } from "./Sceleton/Sceleton.tsx";

function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    dispatch(authActions.initializeApp());
  }, []);

  const handleLogOut = () => {
    dispatch(authActions.logOut());
  };

  if (!isInitialized) {
    return <Sceleton />;
  }
  return (
    <div>
      {isLoggedIn && (
        <header
          className = "flex flex-col items-center justify-between max-w-full md:max-w-6xl px-2 md:px-6 py-12 mx-auto md:flex-row">
          <nav className = "z-10">
            <button
              className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type = "button"
              onClick = {handleLogOut}
            >
              LogOut
            </button>
          </nav>
        </header>
      )}

      <Routes>
        <Route path = {"/"} element = {<TodolistList />} />
        <Route path = {"/login"} element = {<Login />} />
        <Route path = {"*"} element = {<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
