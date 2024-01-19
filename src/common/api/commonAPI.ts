import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "8e58b088-b7ae-4704-88c8-dce9051f5be4",
  },
};
export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});
