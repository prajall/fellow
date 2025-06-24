import React from "react";
import { useProducts } from "../hooks/apiHooks";
import "../css/ShowProducts.css";
import { useEffect } from "react";
import ProductLightbox from "./ProductLightbox";

const ShowProducts = () => {
  const { products, isLoading } = useProducts();

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const showProductDetail = () => {
    console.log("Show Product detail");
  };

  return (
    <div className="product-container">
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <h1 className="product-heading">Products</h1>
          <div className="product-grid">
            {products.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={showProductDetail}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h2 className="product-title">{product.title}</h2>
                  <div className="flex-between">
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart <span>( ${product.price} )</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ProductLightbox
            product={{
              id: 1,
              title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
              price: 109.95,
              description:
                "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
              category: "men's clothing",
              image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
              rating: {
                rate: 3.9,
                count: 120,
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default ShowProducts;
