"use client";

import type { CreateGroupData, Group, GroupResponse } from "@/src/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiRequest } from "../lib/api";

const fetchGroups = async (): Promise<GroupResponse[]> => {
  const response = await apiRequest.get(`/groups/`);
  const data = await response.data;

  return data;
};

const fetchGroupById = async (id: number): Promise<Group> => {
  const response = await apiRequest.get(`/groups/${id}/?group_id=${id}`);
  return response.data;
};

const createGroup = async (groupData: CreateGroupData): Promise<Group> => {
  const response = await apiRequest.post(`/groups/`, groupData);
  return response.data;
};

export const useGroups = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending } = useQuery<GroupResponse[]>({
    queryKey: ["groups"],
    queryFn: () => fetchGroups(),
    staleTime: 10 * 1000,
  });

  const createGroupMutation = useMutation({
    mutationKey: ["groups"],
    mutationFn: createGroup,
    onMutate: async () => {
      toast.loading("Creating group...", { id: "group-create" });
    },
    onSuccess: () => {
      toast.success("Group created successfully", { id: "group-create" });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (err) => {
      console.log("Error creating group:", err);
      toast.error("Failed to create group", { id: "group-create" });
    },
  });

  const getGroupById = (id: number) => {
    return {
      queryKey: ["group", id],
      queryFn: () => fetchGroupById(id),
      staleTime: 10 * 1000,
      enabled: !!id,
    };
  };

  return {
    groups: data || [],

    isLoading: isPending,
    isCreating: createGroupMutation.isPending,

    error,

    createGroup: createGroupMutation.mutateAsync,
    getGroupById,
  };
};

export const useCreateGroup = () => {
  const { createGroup, isCreating } = useGroups();
  return {
    mutate: createGroup,
    mutateAsync: createGroup,
    isPending: isCreating,
  };
};
