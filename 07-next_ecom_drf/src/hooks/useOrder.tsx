import { addOrder, fetchOrders, updateOrderStatus } from "@/actions/orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import z from "zod";

const formSchema = z.object({});

export const useOrder = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const pathname = usePathname();

  const { data, error, isFetching, isPending } = useQuery<any | null>({
    queryKey: ["orders", page],
    queryFn: () => fetchOrders({ page }),
    staleTime: 10 * 1000,
  });

  const orderMutation = useMutation({
    mutationKey: ["orders"],
    mutationFn: (newOrders: z.infer<any>) => addOrder(newOrders),
    onMutate: async () => {
      toast.loading("Uploading Order...", { id: "order" });
    },
    onSuccess: () => {
      toast.success("Order Placed Successfully", { id: "order" });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      console.log("Error uploading order", err);
      toast.error("Failed to upload order", { id: "order" });
    },
  });

  const updateStatusMutation = (orderId: string) => {
    return useMutation({
      mutationKey: ["order", orderId],
      mutationFn: ({ status }: { status: string }) =>
        updateOrderStatus(orderId, status),
      onMutate: async ({ status }) => {
        const previousState = queryClient.getQueryData(["orders"]);

        queryClient.setQueryData(["orders"], (old) => {
          if (!Array.isArray(old) || old.length === 0) {
            console.log("optimistic update: No orders found, returning");
            return old;
          }
          const newData = old.map((order) => {
            return order.id === orderId ? { ...order, status } : order;
          });
          return newData;
        });

        return { previousState };
      },
      onSuccess: () => {
        toast.success("Status Updated Successfully", { id: "order" });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
      onError: (_err, _vars, context) => {
        if (context?.previousState) {
          queryClient.setQueryData(["orders"], context.previousState);
        }
      },
    });
  };

  return {
    orders: data?.results || [],
    createOrder: orderMutation.mutate,
    updateStatusMutation,
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
