import { TodoListResponseType, TodoListType } from "features/todolist-list/model/todolist.types.ts";
import { todolistsAPI } from "features/todolist-list/api/todolistsAPI.ts";
import { createAppSlice } from "common/utils/createAppSlice.ts";
import { authActions } from "auth/authSlice.ts";

const initialState = {
  todoLists: [] as TodoListType[],
};



export const slice = createAppSlice({
  name: "todoList",
  initialState,
  reducers: (creators) => {
    return {

      fetchTodoLists: creators.asyncThunk<void, { todoLists: TodoListResponseType[] }>(
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
                filter: { prioritiesFilter: "all", statusesFilter: "all" },
              }),
            );
          },

        },
      ),
    };
  },
  extraReducers: (builder) => {
  builder
    .addCase(slice.actions.fetchTodoLists.fulfilled, (state, action) => {
    return action.payload.todoLists.forEach((tl) =>
      state.todoLists.push({
        ...tl,
        entityStatus: "idle",
        filter: { prioritiesFilter: "all", statusesFilter: "all" },
      }),
    );
  })
    .addCase(authActions.logOut.fulfilled,()=>{
      return initialState
    })
  },
});

export const todoListsSlice = slice.reducer;
export const todoListsActions = slice.actions;
