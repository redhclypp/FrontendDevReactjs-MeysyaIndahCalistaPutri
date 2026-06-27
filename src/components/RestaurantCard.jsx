import { Link } from 'react-router-dom';
import StarRating from './StarRating.jsx';

export default function RestaurantCard({ business }) {
  // Spec minta "Image (use first item in `photos`)" & "Cuisine/Categories
  // (use first item in `categories`)" -> data kita simpan sebagai array di
  // file JSON, jadi tetap ambil index [0] sesuai spec.
  const image = business.photos?.[0] || '';
  const categoryName = business.categories?.[0] || '-';
  const priceRange = business.price || '-';
  const isOpen = !!business.isOpen;

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden flex flex-col shadow-sm">
      <div className="aspect-[4/3] bg-gray-200">
        {image ? (
          <img
            src={image}
            alt={business.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-medium text-sm text-navy line-clamp-2 mb-1">
          {business.name}
        </h3>

        <StarRating rating={business.rating} />

        <div className="flex items-center justify-between text-xs text-gray-500 mt-2 mb-3">
          <span>
            {categoryName} · {priceRange}
          </span>
          <span
            className={`flex items-center gap-1 font-medium ${
              isOpen ? 'text-emerald-500' : 'text-red-400'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOpen ? 'bg-emerald-500' : 'bg-red-400'
              }`}
            />
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>

        <Link
          to={`/restaurant/${business.id}`}
          className="mt-auto bg-navy text-white text-xs font-medium text-center py-2 rounded-md hover:bg-navy/90 transition"
        >
          LEARN MORE
        </Link>
      </div>
    </div>
  );
}
