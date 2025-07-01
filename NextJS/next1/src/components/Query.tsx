"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product, useProductContext } from "@/providers/ProductContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Query = () => {
  const { products, setProducts } = useProductContext();
  const queryClient = useQueryClient();
  //use Query
  const {
    isSuccess,
    data,
    isPending,
    isFetching,
  }: { isSuccess: boolean; data: any; isPending: any; isFetching: boolean } =
    useQuery({
      queryKey: ["product"],
      queryFn: () => fetchProduct(),
      staleTime: 10 * 1000,
    });

  //use Mutation
  const productMutation = useMutation({
    mutationKey: ["product"],
    mutationFn: (newProduct: Product) => addProduct(newProduct),
    onSuccess: (newProduct) => {
      console.log("onSuccess of useMutation", newProduct);
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (err) => {
      console.log("Error on useMutation:", err);
    },
  });

  const formSchema = z.object({
    name: z.string().min(3, "Minimum length should be 3"),
    price: z.number(),
    id: z.number().min(1, "Id must be positive integer"),
  });

  type formInfer = z.infer<typeof formSchema>;

  const fetchProduct = async (id?: string) => {
    console.log("Product fetching");
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products);
      }, 2000);
    });
    return response;
  };

  // console.log(data);

  const addProduct = (newProduct: Product) => {
    console.log("addProduct() newProduct:", newProduct);
    const response = new Promise((resolve, reject) => {
      setProducts((prev) => [...prev, newProduct]);
      setTimeout(() => {
        resolve(products);
      }, 1000);
    });
    return response;
  };

  const addHandler = async (data: formInfer) => {
    // e.preventDefault();
    // const form: any = e.target;
    // const name = form.name.value;
    // const price = form.price.value;
    // const id = form.id.value;
    // console.log(name, price, id);
    // productMutation.mutate({ id, name, price });
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  // const [data, setData] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetch = async () => {
  //     await fetchProduct();
  //     setData("hi2");
  //   };
  //   fetch();
  // }, []);

  return (
    <>
      <p>Pending: {String(isPending)}</p>
      <p>Fetching: {String(isFetching)}</p>
      {<p>Success: {String(isSuccess)}</p>}
      <div className="border px-20">
        <h2 className="font-bold mb-3">Products:</h2>
        {data &&
          data.map((product: Product) => (
            <p key={product.id}>
              {product.id} {product.name}
            </p>
          ))}
      </div>
      {/* {data && <p>Data = {JSON.stringify(data)}</p>} */}
      <Link href={"/page2"} className="underline border p-2 mt-5">
        Page 2
      </Link>

      <form
        action=""
        // onSubmit={(e) => handleSubmit(e)}
        onSubmit={handleSubmit(addHandler)}
        className="border p-4 w-96 mt-10"
      >
        <h2 className="text-center">New Product</h2>
        <input
          {...register("name")}
          type="text"
          placeholder="Name of Product"
        />
        {errors.name && (
          <p className="text-red-500">{errors.name.message || ""}</p>
        )}
        <input
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
        />
        {errors.price && (
          <p className="text-red-500">{errors.price.message || ""}</p>
        )}
        <input
          {...register("id", { valueAsNumber: true })}
          type="number"
          placeholder="ID"
        />
        {errors.id && <p className="text-red-500">{errors.id.message || ""}</p>}
        <button
          type="submit"
          className="bg-blue-600 px-2"
          disabled={productMutation.isPending}
        >
          Add
        </button>
      </form>
    </>
  );
};

export default Query;
