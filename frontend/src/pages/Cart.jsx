import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import {
  fetchCart,
  updateItem,
  removeItem,
} from '../features/cart/cartSlice.js';
import { formatPrice } from '../utils/format.js';
import Loader from '../components/Loader.jsx';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-lg mb-4">Please login to view your bag.</p>
        <Link to="/login" className="btn-primary">
          Login
        </Link>
      </div>
    );
  }

  if (loading) return <Loader />;

  const subtotal = items.reduce(
    (acc, i) => acc + (i.product?.finalPrice || i.product?.price || 0) * i.quantity,
    0
  );
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 49;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-3">Your bag is empty</h2>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-4">My Bag ({items.length})</h1>
        {items.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 bg-white rounded p-4 shadow-sm"
          >
            <img
              src={item.product?.images?.[0]}
              alt={item.product?.name}
              className="w-24 h-32 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.product?.brand}</p>
              <p className="text-gray-500 text-sm">{item.product?.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                {item.size && `Size: ${item.size}`}{' '}
                {item.color && `| Color: ${item.color}`}
              </p>
              <p className="font-bold mt-2">
                {formatPrice(
                  (item.product?.finalPrice || item.product?.price) *
                    item.quantity
                )}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="inline-flex items-center border rounded-full overflow-hidden">
                  {item.quantity <= 1 ? (
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => dispatch(removeItem(item._id))}
                      className="px-3 py-1.5 text-red-500 hover:bg-gray-50"
                    >
                      <FiTrash2 />
                    </button>
                  ) : (
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        dispatch(
                          updateItem({
                            itemId: item._id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      className="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                    >
                      &minus;
                    </button>
                  )}
                  <span className="px-4 py-1.5 text-sm font-medium min-w-[2.5rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      dispatch(
                        updateItem({
                          itemId: item._id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded p-6 shadow-sm h-fit">
        <h2 className="font-bold text-lg mb-4">Price Details</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-base">
            <span>Total</span>
            <span>{formatPrice(subtotal + shipping)}</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="btn-primary w-full mt-6"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
