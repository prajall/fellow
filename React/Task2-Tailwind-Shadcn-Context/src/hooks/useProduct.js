import { useState } from "react";
import { useTransition } from "react";
import { useEffect } from "react";
import { products } from "../data";

export const useProducts = () => {
  //   const [products, setProducts] = useState([]);
  //   const [isLoading, fetchTransition] = useTransition();

  //   const fetchProducts = async () => {
  //     try {
  //       const data = products;
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchTransition(() => {
  //       fetchProducts();
  //     });
  //   }, []);

  return { products };
};
