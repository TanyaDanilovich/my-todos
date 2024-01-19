import { instance } from "common/api/commonAPI.ts";
import { TodoListResponseType } from "features/todolist-list/model/todolist.types.ts";

export const todolistsAPI = {
  getTodoLists: () => {
    return instance.get<TodoListResponseType[]>("/todo-lists");
  },
};
