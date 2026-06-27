import { PRICE_OPTIONS, RESTAURANT_CATEGORIES } from '../config.js';

export default function FilterBar({
  openNow,
  onOpenNowChange,
  price,
  onPriceChange,
  category,
  onCategoryChange,
  onClearAll,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4 border-b border-gray-200">
      <span className="text-sm text-gray-500">Filter By:</span>

      {/* Open Now - client-side filter */}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={openNow}
          onChange={(e) => onOpenNowChange(e.target.checked)}
          className="accent-navy"
        />
        Open Now
      </label>

      {/* Price - client-side filter */}
      <select
        value={price}
        onChange={(e) => onPriceChange(e.target.value)}
        className="text-sm border border-gray-200 rounded-md px-2 py-1.5 text-gray-700"
      >
        {PRICE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.value ? `Price: ${opt.label}` : opt.label}
          </option>
        ))}
      </select>

      {/* Categories - tiap kali diganti, fetch file JSON baru dari GitHub */}
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="text-sm border border-gray-200 rounded-md px-2 py-1.5 text-gray-700"
      >
        {RESTAURANT_CATEGORIES.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <button
        onClick={onClearAll}
        className="ml-auto text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md px-3 py-1.5"
      >
        CLEAR ALL
      </button>
    </div>
  );
}
