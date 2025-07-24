"use server";
import { api } from "@/lib/serverApi";
import { withRetry } from "./utils";

const userAPI = async () => {
  const response = await api.get(`/user/info/`);
  return response.data;
};

// export const fetchUserInfo = async () => {
//   try {
//     console.log("Fetching users");
//     const response = await userAPI();
//     if (response.status == 200) {
//       return response.data;
//     }
//   } catch (err: any) {
//     console.log("Error fetching user info", err.response?.data);
//     // if( err.response.status == 401 || err.status == 401 ) {
//     //   const refreshResponse =
//     // }
//   }
// };

export const fetchUserInfo = async () => {
  const response = await withRetry(userAPI);
  console.log("Data", response);
  return response;
};
