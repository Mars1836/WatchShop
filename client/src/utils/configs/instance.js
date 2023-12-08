import axios from "axios"
import getCookie from "../function/getCookie"
import { originRoute } from "./api"
const instance = axios.create({
  baseURL: originRoute,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
})
instance.interceptors.request.use(config => {
  const cookie = getCookie("token")

  if (cookie) {
    config.headers["Authorization"] = `Bearer ${cookie}`
  }
  return config
})
export default instance
