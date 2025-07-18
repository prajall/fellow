import axios from "axios";
import { cookies } from "next/headers";

export const serverApi = async () => {
  const cookie = await cookies();
  const token = cookie.get("access")?.value;

  return axios.create({
    baseURL: "http://localhost:8000",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
