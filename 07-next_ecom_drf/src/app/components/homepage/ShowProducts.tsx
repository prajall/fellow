"use client";
import { useProduct } from "@/hooks/useProduct";
import React from "react";
import ProductCard from "./ProductCard";

const ShowProducts = () => {
  const { products } = useProduct();
  return (
    <>
      <h2 className="text-xl pt-6 pb-4">New Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ShowProducts;
