# Restaurants — Frontend Developer Technical Test

Implementasi mockup "Restaurants" menggunakan React.js. Data restoran disimpan
sebagai **file JSON statis di dalam repo ini sendiri** (folder `data/`), dan
difetch lewat `raw.githubusercontent.com` setelah repo di-push ke GitHub.

Pendekatan ini dipilih karena tidak butuh akun/API key pihak ketiga sama
sekali — cukup GitHub, yang memang sudah wajib dipakai untuk submit project
ini.

## Tech Stack & Versions

- **React**: 18.3.1
- **Node**: >= 18 (dikembangkan dengan Node 22)
- **Build tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router 6
- **Map**: React Leaflet (OpenStreetMap, tidak butuh API key)
- **Data**: file JSON statis di `data/`, di-fetch dari `raw.githubusercontent.com`

## Login

Halaman login sederhana sebagai gate sebelum mengakses daftar restoran
(hardcoded credential, sesuai kebutuhan technical test ini):

- **Username**: `admin`
- **Password**: `admin123`

## ⚠️ PENTING — urutan setup harus seperti ini

Karena data difetch dari GitHub (bukan localhost), **repo ini harus sudah
di-push ke GitHub dulu** sebelum fetch data bisa berhasil, termasuk saat
development lokal.

### 1. Push repo ke GitHub dulu

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/FrontendDevReactjs-MeysyaIndahCalistaPutri.git
git branch -M main
git push -u origin main
```

(Folder `data/` ikut ter-commit otomatis — sudah berisi 12 restoran +
review-nya, dibuat oleh `scripts/generate-data.js`. Tidak perlu generate ulang
kecuali mau ubah datanya.)

### 2. Update `src/config.js`

Ganti `DATA_BASE_URL` dengan username & nama repo GitHub kamu:

```js
export const DATA_BASE_URL =
  'https://raw.githubusercontent.com/USERNAME/FrontendDevReactjs-MeysyaIndahCalistaPutri/main/data';
```

### 3. Install & jalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

> Kalau ada error "Gagal mengambil data restoran", cek lagi: apakah repo
> sudah di-push? apakah `DATA_BASE_URL` sudah benar (coba buka salah satu
> URL-nya langsung di browser, misalnya
> `.../data/restaurants/all.json` — harus muncul JSON, bukan 404).

## Build & Deploy

```bash
npm run build
```

Deploy ke Netlify (drag & drop folder `dist/` ke
[app.netlify.com/drop](https://app.netlify.com/drop), atau connect ke GitHub
repo untuk auto-deploy). Tidak perlu environment variable apapun.

## Struktur Halaman

**Main (`/`)**
- Filter: Open Now (client-side), Price (client-side), Categories — tiap
  kategori diganti, frontend fetch file JSON yang berbeda dari GitHub
  (`data/restaurants/{kategori}.json`)
- Grid restoran: image (photos[0]), kategori (categories[0]), rating, price
  range, status open/closed, nama, tombol Learn More
- Load More: menampilkan lebih banyak item dari data kategori yang sudah
  ter-fetch (lihat Catatan di bawah)

**Detail (`/restaurant/:id`)**
- Nama & rating restoran
- Map lokasi (Leaflet + OpenStreetMap)
- Daftar review: foto, nama, rating, teks — fetch dari
  `data/reviews/{id}.json`

## Struktur Data

**`data/restaurants/{kategori}.json`** — array berisi:
```json
{
  "id": "string",
  "name": "string",
  "photos": ["string url"],
  "categories": ["string"],
  "categoryFilter": "string",
  "rating": "number",
  "price": "$ | $$ | $$$ | $$$$",
  "isOpen": "boolean",
  "address": "string",
  "latitude": "number",
  "longitude": "number"
}
```

**`data/reviews/{id}.json`** — array berisi:
```json
{
  "id": "string",
  "name": "string",
  "image": "string url avatar",
  "rating": "number",
  "text": "string"
}
```

## Catatan & Asumsi (penting buat dijelaskan kalau ditanya)

- **Kenapa file statis, bukan REST API beneran?** Karena beberapa pilihan API
  gratis (Yelp Fusion → sekarang berbayar/trial, mockapi.io → tidak bisa
  diakses dari environment development penulis) tidak bisa dipakai. File JSON
  di GitHub dipilih sebagai solusi paling stabil dan tidak butuh akun
  tambahan.
- **Filter kategori** tetap memicu network request baru ke GitHub setiap kali
  diganti (bukan filter di data yang sudah di memory), supaya tetap merefleksikan
  perilaku "server-side filter" sesuai spek — hanya saja hasil filter-nya
  sudah dihitung sebelumnya (pre-computed) saat membuat file, bukan dihitung
  dinamis oleh sebuah server saat request masuk.
- **Load More** menampilkan data tambahan dari hasil fetch kategori yang
  sedang aktif (karena file statis tidak punya konsep pagination/offset di
  server).
- Data dummy (12 restoran, 3 review masing-masing) dibuat oleh
  `scripts/generate-data.js`. Foto pakai picsum.photos, avatar reviewer pakai
  i.pravatar.cc — keduanya gratis dan tidak butuh API key.
