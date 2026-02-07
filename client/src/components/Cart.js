import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, onRemove, onCheckout }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return <div className="cart empty-cart">Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <h2>Shopping Cart ({cartItems.length} items)</h2>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.product.image || 'https://via.placeholder.com/60'} alt={item.product.name} onError={(e) => e.target.src = 'https://via.placeholder.com/60'} />
            <div className="item-details">
              <h4>{item.product.name}</h4>
              <p className="item-price">${item.product.price.toLocaleString()}</p>
            </div>
            <div className="item-quantity">
              <span>Qty: {item.quantity}</span>
              <span className="subtotal">${(item.product.price * item.quantity).toLocaleString()}</span>
            </div>
            <button 
              className="remove-btn"
              onClick={() => onRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="total">
          <strong>Total: ${totalPrice.toLocaleString()}</strong>
        </div>
        <button 
          className="checkout-btn"
          onClick={onCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
