export default function StarRating({ rating = 0 }) {
  const full = Math.round(rating);

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= full ? 'text-amber-400' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
    </div>
  );
}
