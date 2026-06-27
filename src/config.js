// GANTI dengan username GitHub & nama repo kamu setelah project ini di-push.
// Pastikan branch-nya benar (biasanya "main").
// Format: https://raw.githubusercontent.com/{username}/{repo}/{branch}/data
export const DATA_BASE_URL =
  'https://raw.githubusercontent.com/redhclypp/FrontendDevReactjs-MeysyaIndahCalistaPutri/main/data';

export const PAGE_SIZE = 8;

// `value` harus sama dengan nama file JSON di data/restaurants/
// (lihat scripts/generate-data.js)
export const RESTAURANT_CATEGORIES = [
  { label: 'Categories', value: 'all' },
  { label: 'Italian', value: 'italian' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Mexican', value: 'mexican' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Seafood', value: 'seafood' },
  { label: 'American', value: 'american' },
  { label: 'Thai', value: 'thai' },
  { label: 'Indonesian', value: 'indonesian' },
  { label: 'Korean', value: 'korean' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Cafe', value: 'cafe' },
  { label: 'BBQ', value: 'bbq' },
];

export const PRICE_OPTIONS = [
  { label: 'Price', value: '' },
  { label: '$', value: '$' },
  { label: '$$', value: '$$' },
  { label: '$$$', value: '$$$' },
  { label: '$$$$', value: '$$$$' },
];
