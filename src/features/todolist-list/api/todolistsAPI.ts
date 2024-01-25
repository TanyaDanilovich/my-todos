import { instance } from "common/api/commonAPI.ts";
import { TodoListResponse } from "features/todolist-list/model/todolist.types.ts";
import { AppBaseResponse } from "common/types/common.types.ts";

const todolistUrl='/todo-lists'
export const todolistsAPI = {
  getTodoLists: () => {
    return instance.get<TodoListResponse[]>(todolistUrl);

  },
  addTodolist: (title: string) => {
    return instance.post<AppBaseResponse<{ item: TodoListResponse }>>(todolistUrl, { title });
  },
  deleteTodolist:(todolistId:string)=>{
    return instance.delete<AppBaseResponse>(`${todolistUrl}/${todolistId}`)
  }
};
