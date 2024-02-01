import { TaskPriorities, TaskStatuses } from "common/constants";
import { UpdateTaskAPIModel } from "features/Task/api/tasks/tasksAPI.ts";


export type TaskStatusesKeys = keyof typeof TaskStatuses;
export type TaskPrioritiesKeys = keyof typeof TaskPriorities;


export type TaskType = {
  description?: string;
  title: string;
  status: (typeof TaskStatuses)[TaskStatusesKeys];
  priority: (typeof TaskPriorities)[TaskPrioritiesKeys];
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
  completed: boolean
};

export type UpdateTask = Partial<UpdateTaskAPIModel> & {
  id: string,
  todoListId: string
}

