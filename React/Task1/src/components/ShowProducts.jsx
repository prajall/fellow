import React, { useState } from "react";
import { useProducts } from "../utils/apiHooks";
import "../css/ShowProducts.css";
import ProductLightbox from "./ProductLightbox";
import { withAuth } from "../utils/hoc";

const ShowProducts = () => {
  const { products, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    alert(`"${product.title}" added to cart`);
  };

  const showProductDetail = (id) => {
    console.log("Show Product detail");
    const selected = products.find((product) => product.id === id);
    console.log("Selected Product", selected);
    if (selected) {
      setSelectedProduct(selected);
    }
  };

  const ProtectedLightBox = withAuth(ProductLightbox);
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
                onClick={() => {
                  showProductDetail(product.id);
                }}
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
                        // e.stopPropagation();
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
          {selectedProduct && (
            <ProtectedLightBox
              product={selectedProduct}
              onClose={() => {
                setSelectedProduct(null);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ShowProducts;
