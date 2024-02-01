import { ReactNode } from "react";
import { TaskPriorities, TaskStatuses } from "common/constants";


export type StatusType = "idle" | "loading" | "success " | "error";

export type Mode = "edit" | "view"

export type TaskStatusesKeys = keyof typeof TaskStatuses
export type TaskStatusesValues = (typeof TaskStatuses)[TaskStatusesKeys]

export type TaskPrioritiesKeys = keyof typeof TaskPriorities
export type TaskPrioritiesValues = (typeof TaskPriorities)[TaskPrioritiesKeys]

type FieldErrorType = {
  error: string;
  field: string;
};

export type AppBaseResponse<T = {}> = {
  resultCode: number;
  messages: string | string[];
  data: T;
  fieldsErrors: FieldErrorType[];
};


export type PropsWithChildren<P> = P & { children?: ReactNode };