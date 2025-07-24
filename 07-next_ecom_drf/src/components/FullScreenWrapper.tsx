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
  const restrictedPaths = ["/login", "/signup", "/forgot-password"];
  const pathname = usePathname();

  // if (pathname.startsWith("/admin") || restrictedPaths.includes(pathname)) {
  //   return null;
  // }

  return (
    <div
      className={cn(
        restrictedPaths.includes(pathname) ? "" : "lg:ml-64 md:px-10 ",
        `px-4 mx-auto ${notop ? "" : "py-16"}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default FullScreenWrapper;
