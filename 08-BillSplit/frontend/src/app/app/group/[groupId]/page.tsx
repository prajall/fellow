"use client";
import { GroupContent } from "@/src/components/GroupContent";
import React from "react";

const GroupDetail = ({ params }: { params: Promise<{ groupId: string }> }) => {
  const { groupId } = React.use(params);
  return (
    <div className="flex-1">
      <GroupContent groupId={Number(groupId)} />
    </div>
  );
};

export default GroupDetail;
