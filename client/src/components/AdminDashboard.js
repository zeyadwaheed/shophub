import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/authAPI';
import './AdminDashboard.css';

function AdminDashboard({ onBack }) {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'orders'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const [usersData, ordersData] = await Promise.all([
          authAPI.getUsers(),
          authAPI.getOrders()
        ]);
        setUsers(usersData);
        setOrders(ordersData);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <button className="admin-back-btn" onClick={onBack}>
          ← Back to Store
        </button>
        <h1>👑 Admin Dashboard</h1>
        <p className="admin-subtitle">Manage users and orders</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👤 Users ({users.length})
        </button>
        <button
          className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          🛒 Orders ({orders.length})
        </button>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : activeTab === 'users' ? (
        <div className="admin-users-card">
          <h2>Registered Users ({users.length})</h2>
          <div className="admin-users-table-wrap">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge role-${u.role}`}>{u.role}</span>
                    </td>
                    <td>{formatDate(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="admin-users-card">
          <h2>Checked-out Orders ({orders.length})</h2>
          <div className="admin-users-table-wrap">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Customer</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.productName}</td>
                    <td>{o.productBrand}</td>
                    <td>{o.quantity}</td>
                    <td>${Number(o.totalPrice).toLocaleString()}</td>
                    <td>
                      <span className={`role-badge status-${o.status}`}>{o.status}</span>
                    </td>
                    <td className="customer-cell">
                      <span className="customer-name">{o.userFullName || o.userId}</span>
                      <span className="customer-email">{o.userEmail}</span>
                    </td>
                    <td>{formatDate(o.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <p className="admin-empty">No orders yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
