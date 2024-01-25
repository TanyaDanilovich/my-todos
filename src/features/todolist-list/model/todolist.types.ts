import { StatusType } from "common/types/common.types.ts";
import { TaskPriorities, TaskStatuses } from "common/constants";
import { TaskPrioritiesKeys, TaskStatusesKeys } from "features/Task/model/task.types.ts";

export type PrioritiesFilter = "all" | (typeof TaskPriorities)[TaskPrioritiesKeys];

export type StatusesFilter = "all" | (typeof TaskStatuses)[TaskStatusesKeys]

export type TodoListType = TodoListResponse & {
  entityStatus: StatusType;
  filter: {
    prioritiesFilter: PrioritiesFilter;
    statusesFilter: StatusesFilter;
  };
};

export type TodoListResponse = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
