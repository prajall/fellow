import axios, { InternalAxiosRequestConfig } from "axios";
import { cookies as cookiesHeader } from "next/headers";

export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const cookies = await cookiesHeader();
  const token = cookies.get("access")?.value;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const cookies = await cookiesHeader();
//     console.log("inside response interceptor error", error.response.data);
//     if (error.response?.status == 401 && !error.config._retry) {
//       error.config._retry = true;

//       console.log("Refreshing refresh token");

//       try {
//         const refreshToken = cookies.get("refresh")?.value || "";
//         if (!refreshToken) {
//           return Promise.reject("No refresh token available");
//         }
//         console.log("here 1");
//         const refreshResponse = await axios.post(
//           "http://localhost:3000/api/user/refresh",
//           {
//             refresh: refreshToken,
//           }
//         );
//         console.log("From interceptor", refreshResponse.data);

//         if (refreshResponse.status == 200) {
//           console.log("Retrying original request");
//           return api(error.config);
//         }
//       } catch (e: any) {
//         console.log("Error in interceptor", e);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// try {
//   const refreshToken = cookies.get("refresh")?.value || "";
//   console.log("Refresh token", refreshToken);

//   if (!refreshToken) {
//     return Promise.reject("No refresh token available");
//   }
//   const refreshResponse = await axios.post(
//     `${API_URL}/user/token/refresh/`,
//     {
//       refresh: refreshToken,
//     }
//   );
//   if (refreshResponse.status == 200) {
//     console.log("successfully refreshed token");
//     const accessToken = refreshResponse.data?.access;

//     cookies.set("access", accessToken);

//     error.config.headers.Authorization = `Bearer ${accessToken}`;

//     return api(error.config);
//   }
// } catch (e: any) {
//   if (
//     e.status === 401 &&
//     e.response?.data?.detail === "Token is invalid"
//   ) {
//     console.log("redirectinv");
//     cookies.delete("access");
//     cookies.delete("refresh");
//     return Promise.reject(e);
//   }
//   return Promise.reject(e);
// }
