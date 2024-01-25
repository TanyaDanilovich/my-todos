import { todoListsActions } from "features/todolist-list/model/todoListSlice.ts";
import { TaskType } from "features/Task/model/task.types.ts";
import { tasksAPI } from "features/Task/api/tasks/tasksAPI.ts";
import { createAppSlice } from "common/utils/createAppSlice.ts";
import { authActions } from "auth/authSlice.ts";


export type TaskStateType = {
  [key: string]: TaskType[]
};

export const slice = createAppSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: ((create) => {
    return {
      setTasks: create.asyncThunk<string, {
        todolistId: string;
        tasks: TaskType[]
      }>(async (todolistId) => {

        const res = await tasksAPI.fetchTasks(todolistId);
        return { todolistId, tasks: res.data.items };


      }, {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks;
        }
      })
    };
  }),


  extraReducers: (builder) => {
    builder
      .addCase(todoListsActions.fetchTodoLists.fulfilled, (state, action) => {
        action.payload.todoLists.forEach((tl) => (state[tl.id] = []));
      })
      .addCase(todoListsActions.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(authActions.logOut.fulfilled, () => {
        return slice.getInitialState();
      });
  }
});

export const tasksSlice = slice.reducer;
export const tasksActions = slice.actions;


