import { fetchUserInfo } from "@/actions/users";
import { redirect } from "next/navigation";
import React from "react";

const MyOrdersLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await fetchUserInfo();

  if (!user) {
    redirect("/login");
  }

  return children;
};

export default MyOrdersLayout;
