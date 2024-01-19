import {
  PrioritiesTitle,
  PrioritiesValue,
  StatusesTitle,
  StatusesValue,
} from "features/Task/model/task.types.ts";

export type TaskProperties<D, V> = { description: D; value: V };
export const TASK_STATUSES: readonly TaskProperties<StatusesTitle, StatusesValue>[] = [
  {
    description: "new",
    value: 0,
  },
  {
    description: "in progress",
    value: 1,
  },

  {
    description: "completed",
    value: 2,
  },

  {
    description: "canceled",
    value: 3,
  },
];

export const PRIORITIES: readonly TaskProperties<PrioritiesTitle, PrioritiesValue>[] = [
  {
    description: "Low",
    value: 0,
  },
  {
    description: "Medium",
    value: 1,
  },
  {
    description: "High",
    value: 2,
  },
  {
    description: "Urgent",
    value: 3,
  },
];


export const ResultCode = {
  Success: 0,
  Error: 1,
  Captcha: 10,
} as const;