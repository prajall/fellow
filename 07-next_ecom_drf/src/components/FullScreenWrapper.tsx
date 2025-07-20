"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

const FullScreenWrapper = ({
  children,
  notop,
  className,
}: {
  children: React.ReactNode;
  notop?: any;
  className?: any;
}) => {
  const pathname = usePathname();
  const adminPath = pathname.startsWith("/admin");

  return (
    <div
      className={cn(
        adminPath ? "lg:ml-64 " : " md:px-10 container",
        `px-4 mx-auto ${notop ? "" : "py-16"}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default FullScreenWrapper;
