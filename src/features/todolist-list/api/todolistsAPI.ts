import { instance } from "common/api/commonAPI.ts";
import { TodoListResponse, TodoListUpdateArg } from "features/todolist-list/model/todolist.types.ts";
import { AppBaseResponse } from "common/types/common.types.ts";

const todoListUrl = "/todo-lists";
export const todolistsAPI = {
  getTodoLists: () => {
    return instance.get<TodoListResponse[]>(todoListUrl);

  },
  createTodolist: (title: string) => {
    return instance.post<AppBaseResponse<{ item: TodoListResponse }>>(todoListUrl, { title });
  },
  deleteTodoList: (todoListId: string) => {
    return instance.delete<AppBaseResponse>(`${todoListUrl}/${todoListId}`);
  },
  updateTodoList: (arg: TodoListUpdateArg) => {
    return instance.put<AppBaseResponse>(`${todoListUrl}/${arg.todoListId}`, { title: arg.title });
  }
};
