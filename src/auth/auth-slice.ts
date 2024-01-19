import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI, UserResponseType } from "./api/authAPI.ts";
import { AppThunk } from "../app/store.ts";
import { appActions } from "../app/app-slice.ts";
import { LoginDataType } from "../features/User/user.types.ts";

const initialState: appUserType = {
  isLoggedIn: false,
  userId: null,
  userEmail: null,
  loginName: null,
};
export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{ userId: number | null }>) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
    me: (
      state,
      action: PayloadAction<{
        userId: number | null;
        userEmail: string | null;
        loginName: string | null;
      }>,
    ) => {
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      state.loginName = action.payload.loginName;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const authSlice = slice.reducer;
export const authActions = slice.actions;

export const meTC = (): AppThunk => async (dispatch) => {
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(
        authActions.me({ userId: res.data.data.id, userEmail: res.data.data.email, loginName: res.data.data.login }),
      );
      dispatch(authActions.logIn({ userId: res.data.data.id }));
    } else {
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(appActions.setInitialized());
  }
};

export const logInTC =
  (loginData: LoginDataType): AppThunk =>
  async (dispatch) => {
    try {
      const res = await authAPI.logIn(loginData);
      dispatch(authActions.logIn({ userId: parseInt(res.data.data.userId) }));
    } catch (e) {
      console.log(e);
    }
  };

export const logOutTC = (): AppThunk => (dispatch) => {
  try {
    authAPI.logOut().then(() => {
      dispatch(authActions.logOut());
    });
  } catch (e) {
    console.log(e);
  }
};

export type appUserType = {
  isLoggedIn: boolean;
  userId: UserResponseType["id"];
  userEmail: UserResponseType["email"];
  loginName: UserResponseType["login"];
};
