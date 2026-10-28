import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';
import Loader from '../components/Loader.jsx';

const ProductList = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = { page, limit: 12 };
        if (category) params.category = category;
        if (keyword) params.keyword = keyword;
        if (sort) params.sort = sort;

        const { data } = await api.get('/products', { params });
        setProducts(data.products);
        setPages(data.pages);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, keyword, sort, page]);

  const title = keyword
    ? `Search results for "${keyword}"`
    : category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold capitalize">{title}</h1>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">Sort: Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded border ${
                    n === page
                      ? 'bg-ajio-dark text-white'
                      : 'bg-white text-ajio-dark'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
