import { LoginDataType, User } from "features/User/user.types.ts";
import { instance } from "common/api/commonAPI.ts";
import { AppResponse } from "common/types/common.types.ts";

export const authAPI = {
  me: () => {
    return instance.get<AppResponse<UserResponse>>("auth/me");
  },
  logIn: (loginData: LoginDataType) => {
    return instance.post<AppResponse<{ userId: string }>>("/auth/login", loginData);
  },
  logOut: () => {
    return instance.delete<AppResponse>("auth/login");
  },
};

export type UserResponse = Omit<User, 'isLoggedIn'>;


