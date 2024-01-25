import { TaskPriorities, TaskStatuses } from "common/constants";


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
};
