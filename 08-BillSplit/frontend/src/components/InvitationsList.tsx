import React, { useEffect } from "react";
import { apiRequest } from "../lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronRight, Loader2, Users, X } from "lucide-react";
import { Card } from "./ui/card";
import { GroupResponse, User } from "../lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface Invitation {
  id: string;
  group: GroupResponse;
  //   user: User;
  invited_by: User;
}

const InvitationsList = () => {
  const queryClient = useQueryClient();
  const fetchInvitations = async () => {
    const response = await apiRequest.get("groups/invitations/");
    return response.data;
  };

  const { data: invitations, isPending } = useQuery<Invitation[]>({
    queryKey: ["invitations"],
    queryFn: fetchInvitations,
  });

  const handleAcceptInvitation = async (groupId: number) => {
    try {
      await apiRequest.post(`groups/${groupId}/accept/`);
      toast.success("Invitation accepted");
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    } catch (error) {
      console.log(error);
      toast.error("Failed to accept invitation");
    }
  };

  const handleRejectInvitation = async (groupId: number) => {
    try {
      await apiRequest.post(`groups/${groupId}/reject/`);
      toast.success("Invitation rejected");
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject invitation");
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="size-4 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {invitations?.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-muted-foreground mt-2">No invitations yet</p>
        </div>
      )}
      {invitations && invitations?.length > 0 && (
        <div>
          {invitations.map((invitation: Invitation) => (
            <Card
              key={invitation.id}
              className={`p-3 cursor-pointer transition-all rounded-xl  `}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={invitation.group.group_image || "/placeholder.svg"}
                    alt={invitation.group.name}
                  />
                  <AvatarFallback>
                    <Users className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">
                    {invitation.group.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    invited by {invitation.invited_by.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-red-500"
                    onClick={() => handleRejectInvitation(invitation.group.id)}
                  >
                    <X className="size-4 text-red-500" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-blue-500"
                    onClick={() => handleAcceptInvitation(invitation.group.id)}
                  >
                    <Check className="size-4 text-blue-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvitationsList;
