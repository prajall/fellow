import React from "react";
import { useEffect } from "react";
import "../css/ProductLightbox.css";

const ProductLightbox = ({ product, onClose }) => {
  return (
    <div className="lightbox-overlay" onClick={() => onClose()} id={product.id}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-grid">
          <div className="lightbox-image-container">
            <img
              src={product.image}
              alt={product.title}
              className="lightbox-image"
            />
          </div>

          <div className="lightbox-details">
            <h2 className="lightbox-title">{product.title}</h2>

            <div className="lightbox-rating">
              <span className="rating-stars">
                {"★".repeat(Math.round(product.rating.rate))}
                {"☆".repeat(5 - Math.round(product.rating.rate))}
              </span>
              <span className="rating-count">
                ({product.rating.count} reviews)
              </span>
            </div>

            <p className="lightbox-price">${product.price.toFixed(2)}</p>

            <p className="lightbox-description">{product.description}</p>

            <button className="add-to-cart-btn lightbox-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLightbox;
