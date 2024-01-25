import { StatusType } from "../common/types/common.types.ts";
import { createAppSlice } from "common/utils/createAppSlice.ts";

const initialState: InitialStateType = {
  isInitialized: false,
  error: null,
  status: "idle"
};
export const slice = createAppSlice({
  name: "app",
  initialState,
  reducers: (create) => {
    return {
      setInitialized: create.reducer((state) => {
        state.isInitialized = true;
      })
    };
  },

  extraReducers: (builder) => {
    builder;
  }
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
