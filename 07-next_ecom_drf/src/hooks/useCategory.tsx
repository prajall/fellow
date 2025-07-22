import { api } from "@/lib/api";
import { CategoryAPIProps, CategoryProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
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

  const params = useParams();
  console.log("params", params);
  const categoryId = params.categoryId;

  const fetchCategories = async () => {
    const response = await api.get(`/product/category/?page=${page}`);
    return response.data;
  };
  const fetchCategoryDetail = async () => {
    const response = await api.get(`/product/category/${categoryId}`);
    return response.data;
  };
  const addCategory = async (newCategory: z.infer<any>) => {
    const response = await api.post("/product/category/", newCategory);
    return response.data;
  };
  const editCategory = async (values: z.infer<any>) => {
    console.log("Editing category", values);
    const response = await api.patch(
      `/product/category/${values.categoryId}/`,
      values
    );
    return response.data;
  };

  const { data, error, isFetching, isPending } =
    useQuery<CategoryAPIProps | null>({
      queryKey: ["categories", page],
      queryFn: fetchCategories,
      staleTime: 10 * 1000,
    });
  const { data: categoryDetail } = useQuery<CategoryProps | null>({
    queryKey: ["category", categoryId],
    queryFn: fetchCategoryDetail,
    staleTime: 10 * 1000,
    enabled: !!categoryId,
  });

  const categoryMutation = useMutation({
    mutationKey: ["categories"],
    mutationFn: addCategory,
    onMutate: async () => {
      toast.loading("Uploading Category...", { id: "categorys" });
    },
    onSuccess: () => {
      toast.success("Uploaded Successfully", { id: "categorys" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.log("Error uplaoding category", err);
      toast.error("Failed to upload category", { id: "categorys" });
    },
  });

  const editCategoryMutation = useMutation({
    mutationKey: ["categories"],
    mutationFn: editCategory,
    onMutate: async () => {
      toast.loading("Updating Category...", { id: "category" });
    },
    onSuccess: () => {
      toast.success("Updated Successfully", { id: "category" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.log("Error updating category", err);
      toast.error("Failed to upload category", { id: "category" });
    },
  });

  return {
    categories: data?.results || [],
    createCategory: categoryMutation.mutate,
    updateCategory: editCategoryMutation.mutate,
    categoryDetail,
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
