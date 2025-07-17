import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get("access");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Retry", error.config._retry);
    if (error.response?.status == 401 && !error.config._retry) {
      error.config._retry = true;

      console.log("REfreshing refresh token");

      try {
        const refreshToken = Cookies.get("refresh");

        if (!refreshToken) {
          window.location.href = "/login";
        }
        const refreshResponse = await axios.post(
          "http://localhost:8000/user/token/refresh/",
          {
            refresh: refreshToken,
          }
        );
        if (refreshResponse.status == 200) {
          console.log("successfully refreshed token");
          const accessToken = refreshResponse.data?.access;

          Cookies.set("access", accessToken);

          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return api(error.config);
        }
      } catch (e: any) {
        if (
          e.status === 401 &&
          e.response?.data?.detail === "Token is invalid"
        ) {
          console.log("redirectinv");
          Cookies.remove("access");
          Cookies.remove("refresh");
          window.location.href = "/loginn";
        }

        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
