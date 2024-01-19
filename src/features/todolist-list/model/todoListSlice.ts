import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { TodoListResponseType, TodoListType } from "features/todolist-list/model/todolist.types.ts";
import { todolistsAPI } from "features/todolist-list/api/todolistsAPI.ts";

const initialState = {
  todoLists: [] as TodoListType[],
};

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const slice = createAppSlice({
  name: "todoList",
  initialState,
  reducers: (creators) => {
    return {
      // setTodoLists: creators.reducer((state, action: PayloadAction<{ todoLists: TodoListResponseType[] }>) => {
      //   return action.payload.todoLists.forEach((tl) =>
      //     state.todoLists.push({
      //       ...tl,
      //       entityStatus: "idle",
      //       filter: { prioritiesFilter: "all", statusesFilter: "all" },
      //     }),
      //   );
      // }),
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
          // rejected:(state, action)=>{
          //
          // }
        },
      ),
    };
  },
  //extraReducers: (builder) => {
  // builder.addCase(slice.actions.fetchTodoLists.fulfilled, (state, action) => {
  //   return action.payload.todoLists.forEach((tl) =>
  //     state.todoLists.push({
  //       ...tl,
  //       entityStatus: "idle",
  //       filter: { prioritiesFilter: "all", statusesFilter: "all" },
  //     }),
  //   );
  // });
  // },
});

export const todoListsSlice = slice.reducer;
export const todoListsActions = slice.actions;
