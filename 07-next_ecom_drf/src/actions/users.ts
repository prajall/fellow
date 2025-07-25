"use server";
import { api } from "@/lib/serverApi";
import { withRetry } from "./utils";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const userAPI = async () => {
  const response = await api.get(`/user/info/`);
  return response.data;
};

export const fetchUserInfo = async () => {
  const response = await withRetry(userAPI);
  console.log("Data", response);
  return response;
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

export const logoutUser = async () => {};
