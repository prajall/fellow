import { API_URL } from "@/lib/api";
import axios from "axios";
import { redirect } from "next/navigation";

const checkUser = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/info/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log("User", response.data);
      const user = response.data;
      return user;
    }
    return null;
  } catch (error: any) {
    console.log("Error in checkuser", error);
    if (error.status == 401) {
      console.log("Error in checkuser", error.response.data);
      console.log("Redirecting from checkUser in admin layout");
      return redirect("/login");
    }
    if (error.status == 403) {
      return redirect("/");
    }
    console.log("Error fetching user", error);
  }
};

export { checkUser };
