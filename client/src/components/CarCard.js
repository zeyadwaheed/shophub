import React from 'react';
import './CarCard.css';

const CarCard = ({ car, onAddToCart }) => {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} className="car-image" />
      <div className="car-info">
        <h2>{car.name}</h2>
        <p className="brand">{car.brand}</p>
        <p className="description">{car.description}</p>
        <div className="car-details">
          <span className="year">{car.year}</span>
          <span className="color">{car.color}</span>
          <span className="category">{car.category}</span>
        </div>
        <div className="car-footer">
          <p className="price">${car.price.toLocaleString()}</p>
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(car)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
