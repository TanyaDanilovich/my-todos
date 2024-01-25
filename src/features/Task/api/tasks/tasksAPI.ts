import { instance } from "common/api/commonAPI.ts";
import { TaskType } from "features/Task/model/task.types.ts";
import { AppBaseResponse } from "common/types/common.types.ts";
import { AxiosResponse } from "axios";

export const tasksAPI = {
  fetchTasks: (todoListId: string) => {
    return instance.get<FetchTasksResponse>(`todo-lists/${todoListId}/tasks`);
  },
  createTask: (arg: CreateTaskArg) => {
    return instance.post<null, AxiosResponse<AppBaseResponse<{
      item: TaskType
    }>>, { title: string }>(`todo-lists/${arg.todoListId}/tasks`, { title: arg.taskTitle });
  },
  deleteTask:(arg:DeleteTaskArg)=>{
    return instance.delete<AppBaseResponse>(`/todo-lists/${arg.todoListId}/tasks/${arg.taskId}`)
  }
};

export type FetchTasksResponse = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};


export type CreateTaskArg = { todoListId: string, taskTitle: string };
export type DeleteTaskArg = { todoListId: string, taskId: string };