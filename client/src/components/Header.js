import React from 'react';
import './Header.css';

const Header = ({ cartCount, onCartClick, user, onLoginClick, onLogoutClick, onLogoClick, onDashboardClick, showDashboardLink }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
          <h1>🛍️ SmartMart</h1>
          <p className="tagline">Your One-Stop E-Commerce Store</p>
        </div>
        <div className="header-right">
          {showDashboardLink && (
            <button className="dashboard-btn" onClick={onDashboardClick}>
              👑 Dashboard
            </button>
          )}
          {user ? (
            <div className="user-section">
              <span className="user-name">👤 {user.fullName}</span>
              <button className="logout-btn" onClick={onLogoutClick}>
                Logout
              </button>
            </div>
          ) : (
            <button className="login-btn" onClick={onLoginClick}>
              👤 Login/Sign Up
            </button>
          )}
          <button className="cart-button" onClick={onCartClick}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
