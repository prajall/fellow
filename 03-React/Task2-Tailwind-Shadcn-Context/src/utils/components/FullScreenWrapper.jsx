import { cn } from "@/lib/utils";
import React from "react";

const FullScreenWrapper = ({ children, notop, className }) => {
  return (
    <div
      className={cn(
        ` px-4 md:px-10 container mx-auto ${notop ? "" : "py-16"}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default FullScreenWrapper;
