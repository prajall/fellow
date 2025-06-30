"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product, useProductContext } from "@/providers/ProductContext";

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
  const { mutate, status } = useMutation({
    mutationKey: ["product"],
    mutationFn: (newProduct: Product) => addProduct(newProduct),
    onSuccess: (newProduct) => {
      console.log("onSuccess of useMutation", newProduct);
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },

    onError: (err) => {
      console.log("Error on useMutation:", err);
    },
    onSettled:()
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form", e);

    const form: any = e.target;
    const name = form.name.value;
    const price = form.price.value;
    const id = form.id.value;
    console.log(name, price, id);

    mutate({ id, name, price });
  };

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
        onSubmit={(e) => handleSubmit(e)}
        className="border p-4 w-96 mt-10"
      >
        <h2 className="text-center">New Product</h2>
        <input type="text" name="name" placeholder="Name of Product" />
        <input type="number" name="price" placeholder="Price" />
        <input type="number" name="id" placeholder="id" />
        <button type="submit" className="bg-blue-600 px-2">
          Add
        </button>
      </form>
    </>
  );
};

export default Query;
