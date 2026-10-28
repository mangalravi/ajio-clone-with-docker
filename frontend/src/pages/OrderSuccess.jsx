import { Link, useParams } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-500 mb-1">
        Your order <span className="font-semibold">#{id.slice(-8).toUpperCase()}</span>{' '}
        has been confirmed.
      </p>
      <p className="text-gray-500 mb-8">
        You will receive a confirmation shortly.
      </p>
      <div className="flex gap-3 justify-center">
        <Link to="/orders" className="btn-primary">
          View Orders
        </Link>
        <Link to="/products" className="btn-outline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
