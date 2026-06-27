import StarRating from './StarRating.jsx';

export default function ReviewItem({ review }) {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      <img
        src={review.image || 'https://i.pravatar.cc/100'}
        alt={review.name}
        className="w-10 h-10 rounded-full object-cover bg-gray-200"
      />
      <div>
        <p className="text-sm font-medium text-navy">{review.name}</p>
        <StarRating rating={review.rating} />
        <p className="text-sm text-gray-600 mt-1">{review.text}</p>
      </div>
    </div>
  );
}
