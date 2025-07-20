import { api } from "@/lib/api";
import { ProductAPIProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import z from "zod";

const formSchema = z.object({
  category: z.string(),
  images: z.array(z.any()),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a valid number",
    }),
  discount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Discount must be a valid number",
  }),
  stock: z
    .string()
    .min(1, "Stock must be at least 1")
    .refine((val) => !isNaN(Number(val)), {
      message: "Stock must be a valid number",
    }),
  image: z.string().nullable().optional(),
  is_active: z.boolean(),
});

export const useProduct = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const fetchProducts = async () => {
    const response = await api.get(`/product/?page=${page}`);
    return response.data;
  };
  const addProduct = async (newProduct: z.infer<any>) => {
    const response = await api.post("/product/", newProduct);
    return response;
  };

  const { data, error, isFetching, isPending } =
    useQuery<ProductAPIProps | null>({
      queryKey: ["products", page],
      queryFn: fetchProducts,
      staleTime: 10 * 1000,
    });

  const productMutation = useMutation({
    mutationKey: ["products"],
    mutationFn: addProduct,
    onMutate: async () => {
      toast.loading("Uploading Product...", { id: "product" });
    },
    onSuccess: () => {
      toast.success("Uploaded Successfully", { id: "product" });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (err) => {
      console.log("Error uplaoding product", err);
      toast.error("Failed to upload product", { id: "product" });
    },
  });

  return {
    products: data?.results || [],
    createProduct: productMutation.mutate,
    isCreating: productMutation.isPending,
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
