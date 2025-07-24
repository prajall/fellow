"use server";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//  if 401 then gets new access token and returns token and original function
export const withRetry = (func: (...args: any[]) => Promise<any>) => {
  return async (...args: any[]) => {
    try {
      const response = await func();
      return response;
    } catch (error: any) {
      const cookieStore = await cookies();
      console.log("Cookie store", cookieStore.get("refresh")?.value);
      const status = error?.response?.status || error?.status;
      console.log("Error status", status);

      //   check error status 401
      if (status == 401) {
        console.log("Access token expired, Refreshing token");
        const refreshToken = cookieStore.get("refresh")?.value || "";
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        try {
          const response = await axios.post(`${API_URL}/user/token/refresh/`, {
            refresh: refreshToken,
          });
          console.log("Refresh response", response.data);

          if (response.status == 200) {
            const accessToken = response.data?.access;

            return {
              refresh: true,
              accessToken,
              retry: () => func(...args),
            };
          }
        } catch (e) {
          throw e;
        }
      }
      throw error;
    }
  };
};
