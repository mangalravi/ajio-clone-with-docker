import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import Loader from '../components/Loader.jsx';
import { formatPrice } from '../utils/format.js';

const statusColors = {
  Processing: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">You have no orders yet.</p>
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded p-5 shadow-sm">
              <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    statusColors[order.status] || ''
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex gap-3 overflow-x-auto">
                {order.items.map((item) => (
                  <img
                    key={item._id}
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded"
                  />
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                <span className="font-bold">
                  {formatPrice(order.totalPrice)}
                </span>
                <span className="text-sm text-gray-500">
                  {order.paymentMethod} ·{' '}
                  {order.isPaid ? 'Paid' : 'Pending payment'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
