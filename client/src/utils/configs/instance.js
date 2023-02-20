import axios from "axios";
import getCookie from "../function/getCookie";
import { originRoute } from "./api";
const instance = axios.create({
  baseURL: originRoute,
  headers: {
    Accept: "application/json",
  },
});
instance.interceptors.request.use((config) => {
  const cookie = getCookie("token");

  console.log(cookie);
  if (cookie) {
    config.headers["Authorization"] = `Bearer ${cookie}`;
  }
  return config;
});
export default instance;
