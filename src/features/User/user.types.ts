export type User = {
  id: number | null;
  email: string | null;
  login: string | null;
};

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
