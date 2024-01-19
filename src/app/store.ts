import { configureStore, ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { todoListsSlice } from "features/todolist-list/model/todoListSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice } from "auth/auth-slice.ts";
import { appSlice } from "app/app-slice.ts";
import { tasksSlice } from "features/Task/model/tasksSlice.ts";

export const store = configureStore({
  reducer: {
    todoLists: todoListsSlice,
    tasks: tasksSlice,
    auth: authSlice,
    app: appSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;
