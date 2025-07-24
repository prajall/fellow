import { cookies } from "next/headers";
import { checkUser } from "./utils";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { fetchUserInfo } from "@/actions/users";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await fetchUserInfo();

  // console.log("User from admin layout.tsx", user);

  if (!user || user.role != "admin") {
    redirect("/");
  }

  return (
    <div>
      <Sidebar />
      <div className="pt-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
