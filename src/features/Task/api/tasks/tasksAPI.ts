import { instance } from "common/api/commonAPI.ts";
import { TaskType } from "features/Task/model/task.types.ts";

export const tasksAPI = {
  fetchTasks: (todolistId: string) => {
    return instance.get<FetchTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
};

export type FetchTasksResponse = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};
