import { LoginDataType, User } from "features/User/user.types.ts";
import { instance } from "common/api/commonAPI.ts";
import { AppBaseResponse } from "common/types/common.types.ts";


export const authAPI = {
  me: () => {
    return instance.get<AppBaseResponse<UserResponse>>("auth/me");
  },
  logIn: (loginData: LoginDataType) => {
    return instance.post<AppBaseResponse<{ userId: string }>>("/auth/login", loginData);
  },
  logOut: () => {
    return instance.delete<AppBaseResponse>("auth/login");
  },
};

export type UserResponse = Omit<User, 'isLoggedIn'>;


