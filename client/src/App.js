import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AuthForm from './components/AuthForm';
import AdminDashboard from './components/AdminDashboard';
import { accessoryAPI } from './services/api';
import { authAPI } from './services/authAPI';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Check if user is already logged in, refresh from server to get role
  useEffect(() => {
    const initUser = async () => {
      const token = authAPI.getToken();
      if (!token) return;
      try {
        const freshUser = await authAPI.fetchMe();
        if (freshUser) setUser(freshUser);
        else setUser(authAPI.getCurrentUser());
      } catch {
        setUser(authAPI.getCurrentUser());
      }
    };
    initUser();
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await accessoryAPI.getAllAccessories();
      setProducts(data);
    } catch (error) {
      setMessage('Failed to load accessories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Increase quantity if product already in cart
      setCartItems(
        cartItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
    
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    if (!user) {
      setMessage('Please login to checkout');
      setShowAuthForm(true);
      return;
    }

    try {
      for (const item of cartItems) {
        await accessoryAPI.createOrder({
          productId: item.product.id,
          quantity: item.quantity
        });
      }
      setMessage('Order placed successfully! 🎉');
      setCartItems([]);
      setShowCart(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to place order');
      console.error(error);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthForm(false);
    setMessage(`Welcome, ${userData.fullName}! 👋`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDashboardBack = () => {
    setShowAdminDashboard(false);
  };

  const handleLogoClick = () => {
    setShowCart(false);
    setShowAdminDashboard(false);
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setShowCart(false);
    setCartItems([]);
    setMessage('Logged out successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="App">
      <Header 
        cartCount={cartItems.length} 
        onCartClick={() => setShowCart(!showCart)}
        user={user}
        onLoginClick={() => setShowAuthForm(true)}
        onLogoutClick={handleLogout}
        onLogoClick={handleLogoClick}
        onDashboardClick={() => setShowAdminDashboard(true)}
        showDashboardLink={user?.role === 'admin'}
      />
      
      {message && <div className="message">{message}</div>}

      {showAuthForm && (
        <AuthForm onSuccess={handleAuthSuccess} onClose={() => setShowAuthForm(false)} />
      )}
      
      <div className="main-container">
        {showAdminDashboard ? (
          <AdminDashboard onBack={handleDashboardBack} />
        ) : showCart ? (
          <Cart 
            cartItems={cartItems} 
            onRemove={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        ) : (
          <>
            <h1>🛍️ All Products</h1>
            
            {/* Category Filter */}
            <div className="category-filter">
              <button 
                className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Products
              </button>
              <button 
                className={`category-btn ${selectedCategory === 'accessory' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('accessory')}
              >
                🎧 Accessories
              </button>
              <button 
                className={`category-btn ${selectedCategory === 'electronics' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('electronics')}
              >
                📱 Electronics
              </button>
              <button 
                className={`category-btn ${selectedCategory === 'clothing' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('clothing')}
              >
                👕 Clothing
              </button>
            </div>

            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
