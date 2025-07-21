import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import z from "zod";

const formSchema = z.object({});

export const useOrder = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const fetchOrders = async () => {
    const response = await api.get(`/order/?page=${page}`);
    console.log("response order", response);
    return response.data;
  };
  const addOrder = async (newOrder: z.infer<any>) => {
    const response = await api.post("/order/", newOrder);
    return response;
  };

  const { data, error, isFetching, isPending } = useQuery<any | null>({
    queryKey: ["orders", page],
    queryFn: fetchOrders,
    staleTime: 10 * 1000,
  });

  const orderMutation = useMutation({
    mutationKey: ["orders"],
    mutationFn: addOrder,
    onMutate: async () => {
      toast.loading("Uploading Order...", { id: "order" });
    },
    onSuccess: () => {
      toast.success("Uploaded Successfully", { id: "order" });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      console.log("Error uploading order", err);
      toast.error("Failed to upload order", { id: "order" });
    },
  });

  return {
    orders: data?.orders || [],
    createOrder: orderMutation.mutate,
    isCreating: orderMutation.isPending,
    error,
    isFetching,
    isPending,
    formSchema,
    metaData: {
      count: data?.count,
      next: data?.next,
      previous: data?.previous,
    },
  };
};
