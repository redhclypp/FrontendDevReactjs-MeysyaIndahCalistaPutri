import { DATA_BASE_URL } from '../config.js';

// Data di-fetch dari file JSON statis di GitHub repo kamu sendiri
// (lewat raw.githubusercontent.com). Ini dipilih karena:
// 1. Hampir mustahil diblokir (GitHub dipakai luas, termasuk buat submit
//    project ini juga).
// 2. Gratis, tanpa rate limit, tanpa signup tambahan.
// 3. CORS-friendly, bisa langsung difetch dari browser.
//
// Trade-off: karena ini file statis (bukan database asli), filter kategori
// disimulasikan dengan menyediakan SATU FILE JSON PER KATEGORI di repo
// (lihat scripts/generate-data.js). Tiap kali kategori berubah, frontend
// tetap melakukan fetch baru ke file yang berbeda - jadi tetap ada round-trip
// network yang nyata, meskipun "filtering"-nya sudah dihitung sebelumnya,
// bukan dihitung dinamis oleh server saat request masuk.

export async function searchRestaurants({ category }) {
  const file = category || 'all';
  const res = await fetch(`${DATA_BASE_URL}/restaurants/${file}.json`);
  if (!res.ok) throw new Error('Gagal mengambil data restoran');
  return res.json(); // array of restaurants
}

export async function getBusinessDetail(id) {
  // Karena tidak ada endpoint "single business", kita ambil dari all.json
  // lalu cari id yang cocok.
  const res = await fetch(`${DATA_BASE_URL}/restaurants/all.json`);
  if (!res.ok) throw new Error('Gagal mengambil detail restoran');
  const all = await res.json();
  const business = all.find((b) => String(b.id) === String(id));
  if (!business) throw new Error('Restoran tidak ditemukan');
  return business;
}

export async function getBusinessReviews(id) {
  const res = await fetch(`${DATA_BASE_URL}/reviews/${id}.json`);
  if (!res.ok) throw new Error('Gagal mengambil review');
  return res.json(); // array of reviews
}
