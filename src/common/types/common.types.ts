import { UserResponse } from "auth/api/authAPI.ts";


export type StatusType = "idle" | "loading" | "success " | "error";


type FieldErrorType = {
  error: string;
  field: string;
};

export type AppResponse<T = UserResponse> = {
  resultCode: number;
  messages: string | string[];
  data: T;
  fieldsErrors: FieldErrorType[];
};