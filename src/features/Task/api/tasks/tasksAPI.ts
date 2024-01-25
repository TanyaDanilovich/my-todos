import { instance } from "common/api/commonAPI.ts";
import { TaskType } from "features/Task/model/task.types.ts";
import { AppBaseResponse } from "common/types/common.types.ts";
import { AxiosResponse } from "axios";

export const tasksAPI = {
  fetchTasks: (todolistId: string) => {
    return instance.get<FetchTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask: (arg: CreateTaskArg) => {
    return instance.post<null, AxiosResponse<AppBaseResponse<{
      item: TaskType
    }>>, { title: string }>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.taskTitle });
  }
};

export type FetchTasksResponse = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};


export type CreateTaskArg = { todolistId: string, taskTitle: string };