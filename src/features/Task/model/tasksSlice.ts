import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store.ts";
import { todoListsActions } from "features/todolist-list/model/todoListSlice.ts";
import { TaskType } from "features/Task/model/task.types.ts";
import { tasksAPI } from "features/Task/api/tasks/tasksAPI.ts";

export type TaskStateType = { [key: string]: TaskType[] };

export const slice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: {
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      state[action.payload.todolistId] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(todoListsActions.fetchTodoLists.fulfilled, (state, action) => {
      action.payload.todoLists.forEach((tl) => (state[tl.id] = []));
    });
  },
});

export const tasksSlice = slice.reducer;
export const tasksActions = slice.actions;

export const setTasksTC =
  (todolistId: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await tasksAPI.fetchTasks(todolistId);
      dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }));
    } catch (e) {
      console.log(e);
    }
  };
