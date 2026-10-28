import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { formatPrice, finalPrice } from '../utils/format.js';
import { toggleWishlist } from '../features/wishlist/wishlistSlice.js';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: wishlist } = useSelector((state) => state.wishlist);

  const isWished = wishlist.some((p) => p._id === product._id);
  const discounted = finalPrice(product.price, product.discountPercent);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please login to use the wishlist');
      return;
    }
    dispatch(toggleWishlist({ productId: product._id, isWished }));
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition relative"
    >
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow"
        aria-label="Toggle wishlist"
      >
        <FiHeart
          className={isWished ? 'fill-ajio-accent text-ajio-accent' : 'text-gray-600'}
        />
      </button>
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>
      <div className="p-3">
        <p className="font-semibold text-sm truncate">{product.brand}</p>
        <p className="text-gray-500 text-sm truncate">{product.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-ajio-price">
            {formatPrice(discounted)}
          </span>
          {product.discountPercent > 0 && (
            <>
              <span className="text-gray-400 line-through text-xs">
                {formatPrice(product.price)}
              </span>
              <span className="text-green-600 text-xs font-semibold">
                {product.discountPercent}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
