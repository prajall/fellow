import { api } from "@/lib/api";
import { CategoryAPIProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const useCategory = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const fetchCategories = async () => {
    const response = await api.get(`/product/category/?page=${page}`);
    return response.data;
  };
  const addCategory = async (newCategory: z.infer<any>) => {
    const response = await api.post("/product/category/", newCategory);
    return response;
  };

  const { data, error, isFetching, isPending } =
    useQuery<CategoryAPIProps | null>({
      queryKey: ["categories", page],
      queryFn: fetchCategories,
      staleTime: 10 * 1000,
    });

  const categoryMutation = useMutation({
    mutationKey: ["categories"],
    mutationFn: addCategory,
    onMutate: async () => {
      toast.loading("Uploading Category...", { id: "category" });
    },
    onSuccess: () => {
      toast.success("Uploaded Successfully", { id: "category" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.log("Error uplaoding category", err);
      toast.error("Failed to upload category", { id: "category" });
    },
  });

  return {
    categories: data?.results || [],
    createCategory: categoryMutation.mutate,
    isCreating: categoryMutation.isPending,
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
