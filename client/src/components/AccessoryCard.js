import React, { useState } from 'react';
import './AccessoryCard.css';

const AccessoryCard = ({ accessory, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const categoryColors = {
    accessory: '9B59B6',
    electronics: 'FF6B6B',
    clothing: 'FFE66D'
  };
  const bgColor = categoryColors[accessory.category] || 'CCCCCC';
  const placeholderImage = `https://imgplaceholder.com/400x300/${bgColor}/FFFFFF?text=${encodeURIComponent(accessory.name)}`;
  
  const displayImage = imageError || !accessory.image ? placeholderImage : accessory.image;

  return (
    <div className="accessory-card">
      <img 
        src={displayImage} 
        alt={accessory.name} 
        className="accessory-image"
        onError={handleImageError}
        loading="lazy"
      />
      <div className="accessory-info">
        <h2>{accessory.name}</h2>
        <p className="brand">{accessory.brand}</p>
        <p className="description">{accessory.description}</p>
        <div className="accessory-details">
          <span className="type">{accessory.type}</span>
          <span className="color">{accessory.color}</span>
          <span className="category">{accessory.category}</span>
        </div>
        <div className="accessory-footer">
          <p className="price">${accessory.price.toLocaleString()}</p>
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(accessory)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessoryCard;
