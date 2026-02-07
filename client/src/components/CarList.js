import React from 'react';
import './CarList.css';
import CarCard from './CarCard';

const CarList = ({ cars, onAddToCart, loading }) => {
  if (loading) {
    return <div className="loading">Loading cars...</div>;
  }

  if (!cars || cars.length === 0) {
    return <div className="no-cars">No cars available</div>;
  }

  return (
    <div className="car-list">
      {cars.map(car => (
        <CarCard key={car.id} car={car} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default CarList;
