import { cookies } from "next/headers";
import { checkUser } from "./utils";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookie = await cookies();
  const token = cookie.get("access")?.value;

  const user = await checkUser(token || "");

  if (!user || user.role != "admin") {
    redirect("/");
  }

  return <div>{children}</div>;
};

export default AdminLayout;
