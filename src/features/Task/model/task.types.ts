export type PrioritiesTitle = "Low" | "Medium" | "High" | "Urgent";
export type PrioritiesValue = 0 | 1 | 2 | 3;

export type StatusesTitle = "new" | "in progress" | "completed" | "canceled";
export type StatusesValue = 0 | 1 | 2 | 3;

export type TaskType = {
  description: string;
  title: string;
  status: StatusesValue;
  priority: PrioritiesValue;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
