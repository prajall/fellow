"use server";
import { api } from "@/lib/serverApi";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const withRetry = async (func: () => any) => {
  try {
    const data = await func();
    return data;
  } catch (error: any) {
    const cookieStore = await cookies();
    const status = error?.response?.status || error?.status;

    if (status === 401) {
      console.log("Cookie Expired. Refreshing");
      const refreshToken = cookieStore.get("refresh")?.value;

      if (!refreshToken) throw new Error("No refresh token");

      try {
        const response = await api.post(`${API_URL}/user/token/refresh/`, {
          refresh: refreshToken,
        });

        if (response.status === 200) {
          const newAccessToken = response.data.access;
          cookieStore.set("access", newAccessToken);

          return await func();
        }
      } catch (e) {
        throw e;
      }
    }

    throw error;
  }
};
