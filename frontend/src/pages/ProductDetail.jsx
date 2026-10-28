import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FiHeart, FiStar } from 'react-icons/fi';
import api from '../services/api.js';
import Loader from '../components/Loader.jsx';
import { formatPrice, finalPrice } from '../utils/format.js';
import { addItem } from '../features/cart/cartSlice.js';
import { toggleWishlist } from '../features/wishlist/wishlistSlice.js';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: wishlist } = useSelector((state) => state.wishlist);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setColor(data.colors?.[0] || '');
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (!product)
    return <p className="text-center py-20 text-gray-500">Product not found.</p>;

  const isWished = wishlist.some((p) => p._id === product._id);
  const discounted = finalPrice(product.price, product.discountPercent);

  const requireAuth = () => {
    if (!user) {
      toast.info('Please login to continue');
      navigate('/login');
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (product.sizes?.length > 0 && !size) {
      toast.warning('Please select a size');
      return;
    }
    if (!requireAuth()) return;
    try {
      await dispatch(
        addItem({ productId: product._id, quantity: 1, size, color })
      ).unwrap();
      toast.success('Added to bag');
    } catch (err) {
      toast.error(err);
    }
  };

  const handleWishlist = () => {
    if (!requireAuth()) return;
    dispatch(toggleWishlist({ productId: product._id, isWished }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
      <div className="bg-gray-100 rounded overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <p className="text-lg font-bold">{product.brand}</p>
        <h1 className="text-gray-600 text-xl mb-3">{product.name}</h1>

        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1 bg-green-600 text-white text-sm px-2 py-0.5 rounded">
            {product.rating?.toFixed(1)} <FiStar className="fill-white" />
          </span>
          <span className="text-gray-500 text-sm">
            {product.numReviews} ratings
          </span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-bold">{formatPrice(discounted)}</span>
          {product.discountPercent > 0 && (
            <>
              <span className="text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="text-green-600 font-semibold">
                {product.discountPercent}% off
              </span>
            </>
          )}
        </div>

        {product.sizes?.length > 0 && (
          <div className="mb-5">
            <p className="font-semibold mb-2">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 border rounded ${
                    size === s
                      ? 'border-ajio-dark bg-ajio-dark text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors?.length > 0 && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Color: {color}</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1 border rounded text-sm ${
                    color === c
                      ? 'border-ajio-dark bg-ajio-dark text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <button onClick={handleAddToCart} className="btn-primary flex-1">
            Add to Bag
          </button>
          <button
            onClick={handleWishlist}
            className="btn-outline flex items-center gap-2"
          >
            <FiHeart
              className={isWished ? 'fill-ajio-accent text-ajio-accent' : ''}
            />
            Wishlist
          </button>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Product Details</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <p className="text-sm text-gray-500 mt-3">
            {product.countInStock > 0
              ? `In stock (${product.countInStock} available)`
              : 'Out of stock'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
