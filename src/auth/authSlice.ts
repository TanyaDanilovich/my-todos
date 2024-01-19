import { authAPI } from "./api/authAPI.ts";
import { LoginDataType } from "../features/User/user.types.ts";
import { createAppSlice } from "common/utils/createAppSlice.ts";
import { appActions } from "app/appSlice.ts";
import { ResultCode } from "common/constants";

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

        initializeApp: create.asyncThunk <void, { user: User }>(async (_, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI;
          const res = await authAPI.me().finally(() => {
            dispatch(appActions.setInitialized());
          });
          if (res.data.resultCode === ResultCode.Success) {
            return { user: { isLoggedIn: true, ...res.data.data } };
          } else {
            return rejectWithValue(res.data.messages);
          }
        }, {
          fulfilled: (state, action) => {
            state.id = action.payload.user.id;
            state.email = action.payload.user.email;
            state.login = action.payload.user.login;
            state.isLoggedIn = action.payload.user.isLoggedIn;
          }

        }),

        logIn: create.asyncThunk<LoginDataType, {
          userId: string
        }>(async (loginData: LoginDataType) => {
          const res = await authAPI.logIn(loginData);
          res;
          return { userId: res.data.data.userId };

        }, {
          fulfilled: (state, action) => {
            state.isLoggedIn = true;
            state.id = parseInt(action.payload.userId);
          }
        }),

        logOut: create.asyncThunk<void, { isLoggedIn: boolean }>(async (_, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          const res = await authAPI.logOut();
          if (res.data.resultCode === 0) {
            return { isLoggedIn: false };
          } else {
            console.log(res.data.messages);
            return rejectWithValue(res.data.messages);
          }
        }, {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
          }
        })

      };
    },

  extraReducers: (builder) => {
    builder;
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
