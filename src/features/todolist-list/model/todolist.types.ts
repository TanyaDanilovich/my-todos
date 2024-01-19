import { PrioritiesValue, StatusesValue } from "features/Task/model/task.types.ts";
import { StatusType } from "common/types/common.types.ts";

export type PrioritiesFilter = "all" | PrioritiesValue;

export type StatusesFilter = "all" | StatusesValue;

export type TodoListType = TodoListResponseType & {
  entityStatus: StatusType;
  filter: {
    prioritiesFilter: PrioritiesFilter;
    statusesFilter: StatusesFilter;
  };
};

export type TodoListResponseType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
