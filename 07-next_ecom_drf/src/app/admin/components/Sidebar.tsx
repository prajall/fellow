"use client";
import { useState } from "react";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-background border-r z-40">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
