import { createSlice } from "@reduxjs/toolkit";
import { StatusType } from "../common/types/common.types.ts";

const initialState: InitialStateType = {
  isInitialized: false,
  error: null,
  status: "idle",
};
export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;

export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: StatusType;
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null;
  isInitialized: boolean;
};
