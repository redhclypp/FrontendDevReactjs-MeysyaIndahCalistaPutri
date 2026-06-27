import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StarRating from '../components/StarRating.jsx';
import MapView from '../components/MapView.jsx';
import ReviewItem from '../components/ReviewItem.jsx';
import { getBusinessDetail, getBusinessReviews } from '../services/dataApi.js';

export default function RestaurantDetail() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const [detail, reviewData] = await Promise.all([
          getBusinessDetail(id),
          getBusinessReviews(id),
        ]);

        if (!isMounted) return;
        setBusiness(detail);
        setReviews(reviewData || []);
      } catch (err) {
        if (isMounted) setError(err.message || 'Gagal memuat detail restoran.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="max-w-3xl mx-auto px-4 py-8 text-sm text-gray-400">
        Memuat...
      </p>
    );
  }

  if (error || !business) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-sm text-red-500 mb-4">{error}</p>
        <Link to="/" className="text-sm text-navy underline">
          Kembali ke daftar restoran
        </Link>
      </div>
    );
  }

  const image = business.photos?.[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="text-xs text-gray-400 hover:text-gray-600">
        ← Back to list
      </Link>

      {image && (
        <img
          src={image}
          alt={business.name}
          className="w-full h-64 object-cover rounded-lg mt-4 mb-4"
        />
      )}

      <h1 className="text-2xl font-semibold text-navy">{business.name}</h1>
      <div className="flex items-center gap-2 mt-1 mb-1">
        <StarRating rating={business.rating} />
        <span className="text-sm text-gray-500">
          {reviews.length} reviews
        </span>
      </div>
      {business.address && (
        <p className="text-sm text-gray-500 mb-6">{business.address}</p>
      )}

      <MapView
        latitude={business.latitude}
        longitude={business.longitude}
        name={business.name}
      />

      <h2 className="text-sm font-medium text-gray-600 mt-8 mb-2">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-sm text-gray-400">Belum ada review.</p>
      ) : (
        <div>
          {reviews.map((r) => (
            <ReviewItem key={r.id} review={r} />
          ))}
        </div>
      )}
    </div>
  );
}
