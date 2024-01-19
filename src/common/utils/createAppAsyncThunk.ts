import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "app/store.ts";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string | null;
}>();
