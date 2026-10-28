import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login, clearError } from '../features/auth/authSlice.js';
import { fetchCart } from '../features/cart/cartSlice.js';
import { fetchWishlist } from '../features/wishlist/wishlistSlice.js';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.auth);

  const redirect = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
      navigate(redirect, { replace: true });
    }
  }, [user, navigate, redirect, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="input-field"
          />
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          New here?{' '}
          <Link to="/register" className="text-ajio-dark font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
