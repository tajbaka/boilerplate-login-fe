import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3090",
  timeout: 30000
});
