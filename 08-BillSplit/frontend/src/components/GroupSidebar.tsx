"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { useGroups } from "@/src/hooks/useGroup";
import { HandCoins, LogOut, Plus, Users } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { CreateGroupDialog } from "./CreateGroupDialog";
import GroupsList from "./GroupsList";
import InvitationsList from "./InvitationsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { apiRequest } from "../lib/api";
import { useRouter } from "next/navigation";

export function GroupSidebar() {
  const { user } = useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { groups = [] } = useGroups();
  const router = useRouter();

  console.log("groups", groups);

  const logoutHandler = async () => {
    await apiRequest.post("/users/logout/");
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full relative pb-20 ">
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold flex gap-2 items-center tracking-[0.07em]">
              <HandCoins className="size-6 " />
              PAYFAIR
            </h1>
            <p className="text-sm mt-1 text-muted-foreground">
              Welcome back, {user?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-2 rounded-xl bg-primary/10">
          <Avatar className="h-8 w-8">
            <AvatarImage src={""} />
            <AvatarFallback className="bg-white">
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            Your Groups
          </h2>
          <Button
            size="sm"
            onClick={() => setShowCreateDialog(true)}
            className="h-8 w-8 p-0"
            variant="secondary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>
          <TabsContent value="groups">
            <GroupsList groups={groups} />
          </TabsContent>
          <TabsContent value="invitations">
            <InvitationsList />
          </TabsContent>
        </Tabs>

        {groups.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No groups yet</p>
          </div>
        )}
      </div>

      <CreateGroupDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
      <Button
        variant="outline"
        className="absolute w-[90%] flex items-center gap-2 bottom-4 right-4 h-10 "
        onClick={() => logoutHandler()}
      >
        Log Out
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
