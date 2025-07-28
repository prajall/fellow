"use server";
import { api } from "@/lib/serverApi";
// import { withRetry } from "./utils";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchUserInfo = async () => {
  try {
    const response = await api.get(`/user/info/`);
    return response.data;
  } catch (error: any) {
    const cookieStore = await cookies();
    const status = error?.response?.status || error?.status;

    if (status === 401) {
      console.log("Cookie Expired. Refreshing");
      const refreshToken = cookieStore.get("refresh")?.value;

      if (!refreshToken) {
        return null;
      }

      try {
        const response = await api.post(`${API_URL}/user/token/refresh/`, {
          refresh: refreshToken,
        });

        if (response.status === 200) {
          const newAccessToken = response.data.access;
          cookieStore.set("access", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
          });
          if (cookieStore.get("access")?.value == newAccessToken) {
            console.log("Cookie set successrully");
          }

          const newResponse = await api.get(`/user/info/`);
          return newResponse.data;
        }
      } catch (e) {
        throw e;
      }
    }

    throw error;
  }
};

const userAPI = async () => {
  const response = await api.get(`/user/info/`);
  return response.data;
};

export const loginUser = async (values: {
  email: string;
  password: string;
}) => {
  const cookieStore = await cookies();
  try {
    const response = await axios.post(`${API_URL}/user/login/`, {
      email: values.email,
      password: values.password,
    });

    if (response.status == 200) {
      const refreshToken = response.data?.refresh;
      const accessToken = response.data?.access;

      cookieStore.set("access", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      cookieStore.set("refresh", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      const userResponse = await api.get("/user/info/");

      return { success: true, data: userResponse.data };
    }
  } catch (error: any) {
    console.log("Login action error", error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        success: false,
        message: error.message,
      };
    }
    throw error;
  }
};

export const logoutUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access");
  cookieStore.delete("refresh");
  return { success: true };
};
