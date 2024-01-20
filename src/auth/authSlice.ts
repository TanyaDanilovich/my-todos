import { authAPI } from "./api/authAPI.ts";
import { LoginDataType } from "../features/User/user.types.ts";
import { createAppSlice } from "common/utils/createAppSlice.ts";
import { appActions } from "app/appSlice.ts";
import { ResultCode } from "common/constants";
import { isFulfilled, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  isLoggedIn: false,
  id: null,
  email: null,
  login: null

};


export const slice = createAppSlice({
  name: "user",
  initialState,


  reducers:
    (create) => {
      return {

        initializeApp: create.asyncThunk <void, {
          user: User
        }>(async (_, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI;
          const res = await authAPI.me().finally(() => {
            dispatch(appActions.setInitialized());
          });
          if (res.data.resultCode === ResultCode.Success) {
            return { user: { isLoggedIn: true, ...res.data.data } };
          } else {
            return rejectWithValue(res.data.messages);
          }
        }, {}),

        logIn: create.asyncThunk<LoginDataType, {
          user: User
        }>(async (loginData, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          const res = await authAPI.logIn(loginData);
          if (res.data.resultCode === ResultCode.Success) {
            return { user: { isLoggedIn: true, id: res.data.data.userId, login: null, email: loginData.email } };
          } else {
            return rejectWithValue(res.data.messages);
          }


        }, {}),

        logOut: create.asyncThunk<void, {
          user: User
        }>(async (_, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          const res = await authAPI.logOut();
          if (res.data.resultCode === 0) {
            return { user: { isLoggedIn: false, id: null, login: null, email: null } };
          } else {
            console.log(res.data.messages);
            return rejectWithValue(res.data.messages);
          }
        }, {})

      };
    },

  extraReducers: (builder) => {
    builder


      .addMatcher(
        isFulfilled(authActions.logIn, authActions.logOut, authActions.initializeApp),
        (state, action: PayloadAction<{
          user: User
        }>) => {
          state.id = action.payload.user.id;
          state.email = action.payload.user.email;
          state.login = action.payload.user.login;
          state.isLoggedIn = action.payload.user.isLoggedIn;
        });
  }
});

export const authSlice = slice.reducer;
export const authActions = slice.actions;


export type User = {
  isLoggedIn: boolean;
  id: number | null;
  email: string | null;
  login: string | null;
};
