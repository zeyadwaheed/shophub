import React from 'react';
import './AccessoryList.css';
import AccessoryCard from './AccessoryCard';

const AccessoryList = ({ accessories, onAddToCart, loading }) => {
  if (loading) {
    return <div className="loading">Loading accessories...</div>;
  }

  if (!accessories || accessories.length === 0) {
    return <div className="no-accessories">No accessories available</div>;
  }

  return (
    <div className="accessory-list">
      {accessories.map(accessory => (
        <AccessoryCard key={accessory.id} accessory={accessory} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default AccessoryList;
