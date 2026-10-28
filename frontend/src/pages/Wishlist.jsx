import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../features/wishlist/wishlistSlice.js';
import ProductCard from '../components/ProductCard.jsx';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ({items.length})</h1>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link to="/products" className="btn-primary">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
