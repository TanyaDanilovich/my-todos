export const TaskStatuses =
  {
    New: 0,
    InProgress: 1,
    Completed: 2,
    Draft: 3
  } as const;


export const TaskPriorities =
  {
    Low: 0,
    Middle: 1,
    Hi: 2,
    Urgently: 3,
    Later: 4
  } as const;


type TaskStatusesKeys = keyof typeof TaskStatuses;
type TaskPrioritiesKeys = keyof typeof TaskPriorities;

export type TaskType = {
  description: string;
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
