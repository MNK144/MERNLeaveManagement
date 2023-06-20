import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2000",
});

export const setAuth = (token) => {
  API.interceptors.request.use(function (config) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
};

export default API;
