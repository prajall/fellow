import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
// import Cookies from "next/headers";

export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
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
    console.log("Retry", error.config);
    if (error.response?.status == 401 && !error.config._retry) {
      error.config._retry = true;

      console.log("Refreshing refresh token");

      try {
        const refreshToken = Cookies.get("refresh");
        console.log("Refresh token", refreshToken);

        if (!refreshToken) {
          return Promise.reject("No refresh token available");
        }
        const refreshResponse = await axios.post(
          `${API_URL}/user/token/refresh/`,
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
          window.location.href = "/login";
        }

        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);
