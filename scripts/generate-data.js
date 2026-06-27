// Generator script - dijalankan SEKALI untuk membuat file JSON statis di
// folder data/. File-file ini yang nanti di-push ke GitHub dan di-fetch
// oleh React app lewat raw.githubusercontent.com.
//
// Cara pakai: node scripts/generate-data.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const restaurants = [
  { id: '1', name: 'Trattoria Bella Notte', photos: ['https://images.unsplash.com/photo-1698318671607-509fd32781c2?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], categories: ['Italian'], categoryFilter: 'italian', rating: 4.5, price: '$$', isOpen: true, address: 'Jl. Ijen No. 12, Malang', latitude: -7.9666, longitude: 112.6326 },
  { id: '2', name: 'Sakura Sushi House', photos: ['https://assets.ladiestory.id/gallery/1701258065617851842-sushiro.jpg'], categories: ['Japanese'], categoryFilter: 'japanese', rating: 4.7, price: '$$$', isOpen: true, address: 'Jl. Soekarno Hatta No. 5, Malang', latitude: -7.9525, longitude: 112.6128 },
  { id: '3', name: 'El Taco Loco', photos: ['https://gran.luchito.com/wp-content/uploads/2018/11/El-Mural-de-los-Poblanos-826x400.jpg'], categories: ['Mexican'], categoryFilter: 'mexican', rating: 4.2, price: '$', isOpen: false, address: 'Jl. Kawi No. 22, Malang', latitude: -7.9786, longitude: 112.6189 },
  { id: '4', name: 'Golden Dragon', photos: ['https://hypnopompblog.wordpress.com/wp-content/uploads/2020/12/chinese.jpg'], categories: ['Chinese'], categoryFilter: 'chinese', rating: 4.0, price: '$$', isOpen: true, address: 'Jl. Veteran No. 9, Malang', latitude: -7.9559, longitude: 112.6147 },
  { id: '5', name: 'Ocean Catch Seafood', photos: ['https://quark-studio.com/wp-content/uploads/2019/07/DijlahVillage-45.jpg'], categories: ['Seafood'], categoryFilter: 'seafood', rating: 4.3, price: '$$$', isOpen: true, address: 'Jl. Sulfat No. 3, Malang', latitude: -7.9483, longitude: 112.6402 },
  { id: '6', name: 'Liberty Diner', photos: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/2c/d9/67/you-can-sit-outide-too.jpg?w=900&h=500&s=1'], categories: ['American'], categoryFilter: 'american', rating: 3.8, price: '$$', isOpen: false, address: 'Jl. Bromo No. 18, Malang', latitude: -7.9701, longitude: 112.6256 },
  { id: '7', name: 'Bangkok Street Kitchen', photos: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/8a/f9/72/sirocco-restaurant.jpg?w=900&h=500&s=1'], categories: ['Thai'], categoryFilter: 'thai', rating: 4.6, price: '$$', isOpen: true, address: 'Jl. Dieng No. 7, Malang', latitude: -7.9601, longitude: 112.6093 },
  { id: '8', name: 'Warung Bu Sri', photos: ['https://www.fasty.id/wp-content/uploads/2024/07/usaha-rumah-makan-sederhana.png'], categories: ['Indonesian'], categoryFilter: 'indonesian', rating: 4.8, price: '$', isOpen: true, address: 'Jl. Gajayana No. 14, Malang', latitude: -7.9505, longitude: 112.6161 },
  { id: '9', name: 'Seoul Garden BBQ', photos: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/4d/ed/1b/678-baekjung-korean-bbq.jpg?w=900&h=500&s=1'], categories: ['Korean'], categoryFilter: 'korean', rating: 4.4, price: '$$$', isOpen: true, address: 'Jl. Ijen No. 30, Malang', latitude: -7.9678, longitude: 112.6311 },
  { id: '10', name: 'Green Leaf Vegetarian', photos: ['https://cdn-assets.jawapos.com/images/1/2026/04/08/restoran-kuliner-vegetarian-terbaik-di-surabaya-freepik-stockking-vFvJk.webp'], categories: ['Vegetarian'], categoryFilter: 'vegetarian', rating: 4.1, price: '$', isOpen: false, address: 'Jl. Tlogomas No. 11, Malang', latitude: -7.9292, longitude: 112.5979 },
  { id: '11', name: 'Morning Brew Cafe', photos: ['https://ik.imagekit.io/tvlk/blog/2023/08/shutterstock_1415138246.jpg'], categories: ['Cafe'], categoryFilter: 'cafe', rating: 4.5, price: '$$', isOpen: true, address: 'Jl. Bandung No. 4, Malang', latitude: -7.9614, longitude: 112.6234 },
  { id: '12', name: 'Smokehouse Pit Stop', photos: ['https://asset.kompas.com/crops/IWiSHV3rJJVhov3RALGyiNXl3bo=/1x0:1280x853/1200x800/data/photo/2020/12/27/5fe82ca262407.jpg'], categories: ['BBQ'], categoryFilter: 'bbq', rating: 3.9, price: '$$', isOpen: true, address: 'Jl. Kertosari No. 6, Malang', latitude: -7.9447, longitude: 112.6355 },
];

const sampleReviewTemplates = [
  { name: 'Dimas Pratama', rating: 5, text: 'Makanannya enak banget, pelayanan ramah, bakal balik lagi!' },
  { name: 'Sarah Amelia', rating: 4, text: 'Tempatnya nyaman, porsi pas, harga oke buat kualitasnya.' },
  { name: 'Budi Santoso', rating: 3, text: 'Lumayan, tapi agak lama nunggu pesanan datang.' },
];

const restaurantsDir = path.join(__dirname, '../data/restaurants');
const reviewsDir = path.join(__dirname, '../data/reviews');

// 1. all.json -> semua restoran
fs.writeFileSync(
  path.join(restaurantsDir, 'all.json'),
  JSON.stringify(restaurants, null, 2)
);

// 2. satu file JSON per kategori -> ini yang dipakai sebagai "server-side"
//    filter: tiap kali user ganti kategori, frontend fetch file BARU dari
//    GitHub, bukan filter di data yang sudah ada di memory.
const categories = [...new Set(restaurants.map((r) => r.categoryFilter))];
categories.forEach((cat) => {
  const filtered = restaurants.filter((r) => r.categoryFilter === cat);
  fs.writeFileSync(
    path.join(restaurantsDir, `${cat}.json`),
    JSON.stringify(filtered, null, 2)
  );
});

// 3. satu file review per restoran (reviews/{id}.json)
restaurants.forEach((r) => {
  const reviews = sampleReviewTemplates.map((t, i) => ({
    id: `${r.id}-${i + 1}`,
    name: t.name,
    rating: t.rating,
    text: t.text,
    image: `https://i.pravatar.cc/100?img=${(Number(r.id) * 3 + i) % 70}`,
  }));
  fs.writeFileSync(
    path.join(reviewsDir, `${r.id}.json`),
    JSON.stringify(reviews, null, 2)
  );
});

console.log(`Selesai! Dibuat ${categories.length + 1} file restoran & ${restaurants.length} file review di folder data/.`);
