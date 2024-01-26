import { useEffect } from "react";
import { useAppDispatch } from "common/hooks/reduxHook.ts";
import { useAppSelector } from "app/store.ts";
import { TodoList } from "features/todolist-list/ui/todolist/TodoList.tsx";
import { Navigate } from "react-router-dom";
import "style.css";
import { todoListsActions } from "features/todolist-list/model/todoListSlice.ts";
import { AddItem } from "common/components/AddItem/AddItemForm.tsx";
import { GreedPlus } from "common/components/icons/GridPlus.tsx";

//type TodoListPropsType = {};

export const TodolistList = (
  // {}: TodoListPropsType
) => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector((state) => state.todoLists.todoLists);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(todoListsActions.fetchTodoLists());
  }, []);

  const addTodolist = (title: string) => {
    dispatch(todoListsActions.createTodolist(title));
  };

  const renderedTodoLists = todoLists.map((tl) => (
    <TodoList
      key = {tl.id}
      id = {tl.id}
      title = {tl.title}
      addedDate = {tl.addedDate}
      entityStatus = {tl.entityStatus}
      order = {tl.order}
      filter = {tl.filter}
    />
  ));

  if (!isLoggedIn) {
    return <Navigate to = {"/login"} />;
  }
  return <div className = "mx-auto px-4 sm:px-6 lg:px-8">
    <AddItem addItem = {addTodolist}><GreedPlus /></AddItem>
    <div>{renderedTodoLists}</div>
    ;
  </div>;

};
