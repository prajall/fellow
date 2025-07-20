import FullScreenWrapper from "@/components/FullScreenWrapper";
import React from "react";
import { redirect } from "next/navigation";

const AdminPage = () => {
  return redirect("/admin/products");
};

export default AdminPage;
