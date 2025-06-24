import { useState } from "react";
import { useTransition } from "react";
import { useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, fetchTransition] = useTransition();

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("No response");
      }
      const data = await response.json();
      console.log("Products fetched:", data);
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  useEffect(() => {
    fetchTransition(() => {
      fetchProducts();
    });
  }, []);

  return { products, isLoading };
};
