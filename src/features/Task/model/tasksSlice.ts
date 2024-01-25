import { todoListsActions } from "features/todolist-list/model/todoListSlice.ts";
import { TaskType } from "features/Task/model/task.types.ts";
import { CreateTaskArg, tasksAPI } from "features/Task/api/tasks/tasksAPI.ts";
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
      }),
      createTask: create.asyncThunk<CreateTaskArg, {
        todolistId: string;
        task: TaskType
      }>(async ({ todolistId, taskTitle }, { rejectWithValue }) => {
        const res = await tasksAPI.createTask({ todolistId, taskTitle });
        if (res.data.resultCode === 0) {
          return {
            todolistId: todolistId,
            task: res.data.data.item
          };
        } else {
          return rejectWithValue(res.data.messages);
        }


      }, {
        fulfilled: (state, action) => {
          state[action.payload.todolistId].push(action.payload.task);
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




