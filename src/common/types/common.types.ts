import { ReactNode } from "react";


export type StatusType = "idle" | "loading" | "success " | "error";

export type Mode = "edit" | "view"

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