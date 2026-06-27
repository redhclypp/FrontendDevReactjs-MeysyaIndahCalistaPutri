import { useEffect, useState, useMemo } from 'react';
import FilterBar from '../components/FilterBar.jsx';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { searchRestaurants } from '../services/dataApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { PAGE_SIZE } from '../config.js';

export default function Home() {
  const { logout } = useAuth();

  const [businesses, setBusinesses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Client-side filters
  const [openNow, setOpenNow] = useState(false);
  const [price, setPrice] = useState('');

  // "Server-side" filter (fetch file JSON baru per kategori)
  const [category, setCategory] = useState('all');

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await searchRestaurants({ category });
        if (isMounted) {
          setBusinesses(data);
          setVisibleCount(PAGE_SIZE); // reset pagination tiap ganti kategori
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.message ||
              'Terjadi kesalahan saat memuat data.'
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [category]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleClearAll = () => {
    setOpenNow(false);
    setPrice('');
    setCategory('all');
  };

  // Open Now & Price difilter di client
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      if (openNow && !b.isOpen) return false;
      if (price && b.price !== price) return false;
      return true;
    });
  }, [businesses, openNow, price]);

  const visibleBusinesses = filteredBusinesses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBusinesses.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-semibold text-navy">Restaurants</h1>
        <button
          onClick={logout}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          Logout
        </button>
      </div>
      <p className="text-sm text-gray-500 max-w-xl mb-4">
        Temukan restoran terbaik, lengkap dengan rating, kategori, dan jam
        buka.
      </p>

      <FilterBar
        openNow={openNow}
        onOpenNowChange={setOpenNow}
        price={price}
        onPriceChange={setPrice}
        category={category}
        onCategoryChange={setCategory}
        onClearAll={handleClearAll}
      />

      <h2 className="text-sm font-medium text-gray-600 my-4">
        All Restaurants
      </h2>

      {error && (
        <p className="text-sm text-red-500 mb-4">
          {error} — pastikan <code>DATA_BASE_URL</code> di{' '}
          <code>src/config.js</code> sudah diganti dengan username & repo
          GitHub kamu, dan repo-nya sudah di-push (folder <code>data/</code>{' '}
          ikut ke-push).
        </p>
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Memuat restoran...</p>
      ) : visibleBusinesses.length === 0 ? (
        <p className="text-sm text-gray-400">
          Tidak ada restoran yang cocok dengan filter ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleBusinesses.map((b) => (
            <RestaurantCard key={b.id} business={b} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="border border-gray-200 text-sm text-gray-600 px-6 py-2 rounded-md hover:bg-gray-50"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
}
