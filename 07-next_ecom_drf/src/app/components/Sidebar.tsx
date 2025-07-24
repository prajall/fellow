"use client";
import { useState } from "react";
import SidebarContent from "./SidebarContent";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const restrictedPaths = ["/login", "/signup", "/forgot-password"];
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || restrictedPaths.includes(pathname)) {
    return null;
  }

  return (
    <>
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-background border-r z-40">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
