import { todoListsActions } from "features/todolist-list/model/todoListSlice.ts";
import { TaskType, UpdateTask } from "features/Task/model/task.types.ts";
import { CreateTaskArg, DeleteTaskArg, tasksAPI, UpdateTaskAPIModel } from "features/Task/api/tasks/tasksAPI.ts";
import { createAppSlice } from "common/utils/createAppSlice.ts";
import { authActions } from "auth/authSlice.ts";
import { RootState } from "app/store.ts";


export type TaskStateType = Record<string, TaskType[]>;

export const slice = createAppSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: ((create) => {
    return {
      setTasks: create.asyncThunk<string, {
        todoListId: string;
        tasks: TaskType[]
      }>(async (todoListId) => {

        const res = await tasksAPI.fetchTasks(todoListId);
        return { todoListId, tasks: res.data.items };


      }, {
        fulfilled: (state, action) => {
          state[action.payload.todoListId] = action.payload.tasks;
        }
      }),
      createTask: create.asyncThunk<CreateTaskArg, {
        todoListId: string;
        task: TaskType
      }>(async (arg, { rejectWithValue }) => {
        const res = await tasksAPI.createTask(arg);
        if (res.data.resultCode === 0) {
          return {
            todoListId: arg.todoListId,
            task: res.data.data.item
          };
        } else {
          return rejectWithValue(res.data.messages);
        }
      }, {
        fulfilled: (state, action) => {
          state[action.payload.todoListId].push(action.payload.task);
        }
      }),
      deleteTask: create.asyncThunk<DeleteTaskArg, DeleteTaskArg>(async (arg, { rejectWithValue }) => {
        const res = await tasksAPI.deleteTask(arg);
        if (res.data.resultCode === 0) {
          return arg;
        } else {
          return rejectWithValue(res.data.messages);
        }
      }, {
        fulfilled: (state, action) => {
          const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
          if (index !== -1) state[action.payload.todoListId].splice(index, 1);
        }
      }),
      updateTask: create.asyncThunk<UpdateTask, { task: TaskType }>(async (arg, { rejectWithValue, getState }) => {
        const tasks = (getState() as RootState).tasks;
        const task = tasks[arg.todoListId].find(task => task.id === arg.id);
        if (task) {
          const updateModel: UpdateTaskAPIModel = { ...task, ...arg };
          const res = await tasksAPI.updateTask(updateModel);
          if (res.data.resultCode === 0) {
            return { task: res.data.data.item };
          } else {
            return rejectWithValue(res.data.messages);
          }
        } else {
          return rejectWithValue("task insn't exist");
        }

      }, {
        fulfilled: (state, action) => {
          const index = state[action.payload.task.todoListId].findIndex(task => task.id === action.payload.task.id);
          if (index !== -1) state[action.payload.task.todoListId][index] = action.payload.task;
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




