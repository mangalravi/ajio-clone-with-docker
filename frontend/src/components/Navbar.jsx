import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { logout } from '../features/auth/authSlice.js';
import { resetCart } from '../features/cart/cartSlice.js';
import { resetWishlist } from '../features/wishlist/wishlistSlice.js';

const categories = [
  { label: 'Men', path: '/products/men' },
  { label: 'Women', path: '/products/women' },
  { label: 'Kids', path: '/products/kids' },
  { label: 'Footwear', path: '/products/footwear' },
  { label: 'Accessories', path: '/products/accessories' },
];

const Navbar = () => {
  const [keyword, setKeyword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(keyword.trim())}`);
      setKeyword('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetWishlist());
    navigate('/');
  };

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 gap-4">
        <Link to="/" className="text-2xl font-extrabold text-ajio-dark">
          AJIO<span className="text-ajio-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {categories.map((c) => (
            <Link key={c.path} to={c.path} className="hover:text-ajio-accent">
              {c.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center bg-gray-100 rounded px-3 py-2 flex-1 max-w-sm"
        >
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for products"
            className="bg-transparent outline-none px-2 w-full text-sm"
          />
        </form>

        <div className="flex items-center gap-4 text-xl">
          {user ? (
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-1 text-sm font-semibold">
                <FiUser /> {user.name.split(' ')[0]}
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block bg-white shadow-lg rounded w-40 py-2 text-sm">
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:block" title="Login">
              <FiUser />
            </Link>
          )}
          <Link to="/wishlist" title="Wishlist">
            <FiHeart />
          </Link>
          <Link to="/cart" className="relative" title="Cart">
            <FiShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-ajio-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t bg-white px-4 py-3 flex flex-col gap-3 text-sm font-semibold">
          {categories.map((c) => (
            <Link
              key={c.path}
              to={c.path}
              onClick={() => setMenuOpen(false)}
              className="hover:text-ajio-accent"
            >
              {c.label}
            </Link>
          ))}
          {!user && (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login / Register
            </Link>
          )}
          {user && (
            <button onClick={handleLogout} className="text-left">
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
