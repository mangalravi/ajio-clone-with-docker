import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../services/api.js';
import { fetchCart, resetCart } from '../features/cart/cartSlice.js';
import { formatPrice } from '../utils/format.js';
import loadRazorpay from '../utils/loadRazorpay.js';
import Loader from '../components/Loader.jsx';

const emptyAddress = {
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
};

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(emptyAddress);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const subtotal = items.reduce(
    (acc, i) =>
      acc + (i.product?.finalPrice || i.product?.price || 0) * i.quantity,
    0
  );
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 49;

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.warning('Your bag is empty');
      return;
    }
    setPlacing(true);
    try {
      const orderItems = items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
      }));
      const { data } = await api.post('/orders', {
        items: orderItems,
        shippingAddress: address,
        paymentMethod,
      });

      // COD: finalize immediately (unchanged original flow).
      if (paymentMethod === 'COD') {
        dispatch(resetCart());
        toast.success('Order placed successfully');
        navigate(`/order-success/${data._id}`);
        return;
      }

      // CARD/UPI: run the order through Razorpay Checkout. The order comes
      // back unpaid and is only marked paid after the backend verifies the
      // signature.
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setPlacing(false);
        return;
      }

      const { data: pay } = await api.post('/payment/create-order', {
        orderId: data._id,
      });

      const options = {
        key: pay.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: pay.amount,
        currency: pay.currency,
        order_id: pay.razorpayOrderId,
        name: 'AJIO Clone',
        description: 'Order Payment',
        prefill: {
          name: address.fullName,
          contact: address.phone,
        },
        theme: { color: '#2c4152' },
        handler: async (resp) => {
          try {
            await api.post('/payment/verify', {
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
              orderId: data._id,
            });
            dispatch(resetCart());
            toast.success('Payment successful');
            navigate(`/order-success/${data._id}`);
          } catch (verifyErr) {
            toast.error(verifyErr.message || 'Payment verification failed');
            setPlacing(false);
          }
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled');
            setPlacing(false);
          },
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error(err.message || 'Failed to place order');
      setPlacing(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
      <form
        onSubmit={handlePlaceOrder}
        className="lg:col-span-2 bg-white rounded p-6 shadow-sm space-y-4"
      >
        <h1 className="text-2xl font-bold">Shipping Address</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="input-field"
          />
          <input
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="input-field"
          />
        </div>
        <input
          name="line1"
          value={address.line1}
          onChange={handleChange}
          placeholder="Address Line 1"
          required
          className="input-field"
        />
        <input
          name="line2"
          value={address.line2}
          onChange={handleChange}
          placeholder="Address Line 2 (optional)"
          className="input-field"
        />
        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="input-field"
          />
          <input
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="State"
            required
            className="input-field"
          />
          <input
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            className="input-field"
          />
        </div>

        <h2 className="text-lg font-bold pt-2">Payment Method</h2>
        <div className="space-y-2">
          {['COD', 'CARD', 'UPI'].map((m) => (
            <label key={m} className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value={m}
                checked={paymentMethod === m}
                onChange={() => setPaymentMethod(m)}
              />
              {m === 'COD' ? 'Cash on Delivery' : m}
            </label>
          ))}
        </div>

        <button type="submit" disabled={placing} className="btn-primary w-full">
          {placing ? 'Placing Order...' : 'Confirm Order'}
        </button>
      </form>

      <div className="bg-white rounded p-6 shadow-sm h-fit">
        <h2 className="font-bold text-lg mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items ({items.length})</span>
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
      </div>
    </div>
  );
};

export default Checkout;
