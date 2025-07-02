import React from "react";

const FullScreenWrapper = ({
  children,
  notop,
}: {
  children: React.ReactNode;
  notop?: boolean;
}) => {
  return (
    <div className={` px-4 md:px-10 container mx-auto ${notop ? "" : "py-16"}`}>
      {children}
    </div>
  );
};

export default FullScreenWrapper;
