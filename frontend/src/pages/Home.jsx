import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';
import Loader from '../components/Loader.jsx';

const banners = [
  {
    title: 'The Big Fashion Sale',
    subtitle: 'Up to 70% off on top brands',
    cta: '/products',
    bg: 'from-ajio-dark to-ajio-accent',
  },
];

const categoryTiles = [
  { label: 'Men', path: '/products/men', img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400' },
  { label: 'Women', path: '/products/women', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400' },
  { label: 'Kids', path: '/products/kids', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400' },
  { label: 'Footwear', path: '/products/footwear', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/products/featured');
        setFeatured(data);
      } catch {
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      {/* Hero banner */}
      <section
        className={`bg-gradient-to-r ${banners[0].bg} text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            {banners[0].title}
          </h1>
          <p className="text-lg mb-6">{banners[0].subtitle}</p>
          <Link to={banners[0].cta} className="btn-primary bg-white text-ajio-dark">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Category tiles */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryTiles.map((c) => (
            <Link
              key={c.path}
              to={c.path}
              className="relative rounded overflow-hidden group h-48"
            >
              <img
                src={c.img}
                alt={c.label}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
              <span className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xl font-bold">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        {loading ? (
          <Loader />
        ) : featured.length === 0 ? (
          <p className="text-gray-500">
            No products yet. Run the backend seed script to populate the catalog.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
