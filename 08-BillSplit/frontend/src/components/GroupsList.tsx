import React from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Users } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { GroupResponse } from "../lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const GroupsList = ({ groups }: { groups: GroupResponse[] }) => {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  return (
    <div className="space-y-2">
      {groups.map((group) => (
        <Link href={`/app/group/${group.id}`} key={group.id}>
          <Card
            className={`p-3 cursor-pointer transition-all rounded-xl mt-2 ${
              groupId == group.id.toString() ? "bg-muted" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                // src={group.group_image || "/placeholder.svg"}
                // alt={group.name}
                />
                <AvatarFallback>
                  <Users className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{group.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {group.total_members} members
                </p>
              </div>
              <ChevronRight className="size-3 text-muted-foreground" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default GroupsList;
