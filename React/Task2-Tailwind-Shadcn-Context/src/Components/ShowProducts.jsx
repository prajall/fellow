import { useProducts } from "@/hooks/useProduct";
import React from "react";
import ProductCard from "./ProductCard";

const ShowProducts = () => {
  const { products } = useProducts();
  console.log(products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ShowProducts;
