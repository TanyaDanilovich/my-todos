import { LoginDataType, User } from "features/User/user.types.ts";
import { instance } from "common/api/commonAPI.ts";

export const authAPI = {
  me: () => {
    return instance.get<AuthResponseType>("auth/me");
  },
  logIn: (loginData: LoginDataType) => {
    return instance.post<AuthResponseType<{ userId: string }>>("/auth/login", loginData);
  },
  logOut: () => {
    return instance.delete<AuthResponseType>("auth/login");
  },
};

export type UserResponseType = User;

export type AuthResponseType<T = UserResponseType> = {
  resultCode: number;
  messages: string | string[];
  data: T;
};
