import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Better placeholder with category-specific colors
  const categoryColors = {
    car: '4472C4',
    electronics: 'FF6B6B',
    clothing: 'FFE66D'
  };
  const bgColor = categoryColors[product.category] || 'CCCCCC';
  const placeholderImage = `https://imgplaceholder.com/400x300/${bgColor}/FFFFFF?text=${encodeURIComponent(product.name)}`;
  
  const displayImage = imageError || !product.image ? placeholderImage : product.image;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img 
          src={displayImage} 
          alt={product.name} 
          className="product-image"
          onError={handleImageError}
          loading="lazy"
        />
        <span className="category-badge">{product.category}</span>
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="brand">{product.brand}</p>
        <p className="description">{product.description}</p>
        <div className="product-details">
          {product.year && <span className="detail">{product.year}</span>}
          {product.color && <span className="detail">{product.color}</span>}
        </div>
        <div className="product-footer">
          <p className="price">${product.price.toLocaleString()}</p>
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
