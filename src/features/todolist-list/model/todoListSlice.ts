import { TodoListResponse, TodoListType } from "features/todolist-list/model/todolist.types.ts";
import { todolistsAPI } from "features/todolist-list/api/todolistsAPI.ts";
import { createAppSlice } from "common/utils/createAppSlice.ts";
import { authActions } from "auth/authSlice.ts";

const initialState = {
  todoLists: [] as TodoListType[]
};


export const slice = createAppSlice({
  name: "todoList",
  initialState,
  reducers: (creators) => {
    return {

      fetchTodoLists: creators.asyncThunk<void, {
        todoLists: TodoListResponse[]
      }>(
        async () => {
          const res = await todolistsAPI.getTodoLists();
          return { todoLists: res.data };
        },
        {
          fulfilled: (state, action) => {
            return action.payload.todoLists.forEach((tl) =>
              state.todoLists.push({
                ...tl,
                entityStatus: "idle",
                filter: { prioritiesFilter: "all", statusesFilter: "all" }
              })
            );
          }

        }
      ),

      createTodolist: creators.asyncThunk<string, {
        todolist: TodoListResponse
      }>(async (title) => {
        const res = await todolistsAPI.createTodolist(title);
        console.log(res);
        return { todolist: res.data.data.item };
      }, {
        fulfilled: (state, action) => {
          state.todoLists.unshift({
            ...action.payload.todolist,
            entityStatus: "idle",
            filter: { prioritiesFilter: "all", statusesFilter: "all" }
          });
        }
      }),
      deleteTodolist: creators.asyncThunk<string, {
        todoListId: string
      }>(async (todoListId, { rejectWithValue }) => {
        const res = await todolistsAPI.deleteTodolist(todoListId);
        if (res.data.resultCode === 0) {
          return { todoListId };
        } else {
          return rejectWithValue(res.data.messages);
        }
      }, {
        fulfilled: (state, action) => {
          const index = state.todoLists.findIndex(todo => todo.id === action.payload.todoListId);
          if (index !== -1) state.todoLists.splice(index, 1);
        }
      })
    };
  },
  extraReducers: (builder) => {
    builder
      .addCase(slice.actions.fetchTodoLists.fulfilled, (state, action) => {
        return action.payload.todoLists.forEach((tl) =>
          state.todoLists.push({
            ...tl,
            entityStatus: "idle",
            filter: { prioritiesFilter: "all", statusesFilter: "all" }
          })
        );
      })
      .addCase(authActions.logOut.fulfilled, () => {
        return initialState;
      });
  }
});

export const todoListsSlice = slice.reducer;
export const todoListsActions = slice.actions;
