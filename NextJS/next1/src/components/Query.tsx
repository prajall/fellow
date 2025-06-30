"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { products } from "./data";

const Query = () => {
  const { isSuccess, data, error, isError, isPending, isFetching } = useQuery({
    queryKey: ["product", "123"],
    queryFn: () => fetchProduct("123"),
    staleTime: 10 * 1000,
  });

  // const [data, setData] = useState<string | null>(null);

  const fetchProduct = async (id?: string) => {
    console.log("Product fetching");
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products);
      }, 2000);
    });
    return response;
  };

  // useEffect(() => {
  //   const fetch = async () => {
  //     await fetchProduct();
  //     setData("hi2");
  //   };
  //   fetch();
  // }, []);

  console.log(data);

  return (
    <>
      <p>Pending: {String(isPending)}</p>
      <p>Fetching: {String(isFetching)}</p>
      {<p>Success: {String(isSuccess)}</p>}
      <p>Data = {String(data ? data[0].name : "")}</p>
      <Link href={"/page2"}>Page 2</Link>
    </>
  );
};

export default Query;
