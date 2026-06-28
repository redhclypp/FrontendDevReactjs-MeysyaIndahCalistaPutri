# Restaurants — Frontend Developer Technical Test

Aplikasi web pencarian restoran yang dibangun menggunakan React.js. Pengguna dapat melihat daftar restoran, melakukan filter berdasarkan kategori, harga, dan status buka, serta melihat detail restoran beserta lokasi dan ulasan.

Karena API restoran yang direkomendasikan tidak dapat digunakan selama proses pengembangan, aplikasi ini menggunakan file JSON statis yang disimpan pada folder `data/` dan di-fetch melalui `raw.githubusercontent.com` setelah repository di-push ke GitHub. Pendekatan ini memungkinkan aplikasi tetap melakukan proses fetch data seperti menggunakan API.

---

## Tech Stack

* React 18
* Vite 5
* Tailwind CSS 3
* React Router DOM 6
* React Leaflet
* OpenStreetMap
* Static JSON (GitHub Raw Content)

---

## Fitur

* Login sederhana menggunakan username dan password.
* Menampilkan daftar restoran.
* Filter berdasarkan:

  * Open Now
  * Price
  * Categories
* Halaman detail restoran.
* Menampilkan lokasi restoran menggunakan OpenStreetMap.
* Menampilkan ulasan restoran.
* Fitur **Load More** pada daftar restoran.
* Tampilan responsif.

---

## Login

Gunakan akun berikut untuk masuk ke aplikasi:

* **Username:** `admin`
* **Password:** `admin123`

---

## Cara Menjalankan Project

### 1. Push repository ke GitHub

Karena data diambil dari GitHub Raw Content, repository harus sudah di-push terlebih dahulu.

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/FrontendDevReactjs-MeysyaIndahCalistaPutri.git
git branch -M main
git push -u origin main
```

---

### 2. Konfigurasi `src/config.js`

Sesuaikan `DATA_BASE_URL` dengan username dan nama repository GitHub.

```javascript
export const DATA_BASE_URL =
'https://raw.githubusercontent.com/USERNAME/FrontendDevReactjs-MeysyaIndahCalistaPutri/main/data';
```

---

### 3. Install dependency

```bash
npm install
```

---

### 4. Jalankan project

```bash
npm run dev
```

---

## Build Project

```bash
npm run build
```

---

---

## Struktur Data

### Restaurant

```json
{
  "id": "string",
  "name": "string",
  "photos": ["string"],
  "categories": ["string"],
  "categoryFilter": "string",
  "rating": 4.8,
  "price": "$$",
  "isOpen": true,
  "address": "string",
  "latitude": -7.98,
  "longitude": 112.63
}
```

### Review

```json
{
  "id": "string",
  "name": "string",
  "image": "string",
  "rating": 5,
  "text": "string"
}
```

---

## Catatan

* Data restoran dan ulasan disimpan dalam bentuk file JSON statis.
* Setiap perubahan kategori akan melakukan fetch ke file JSON kategori yang sesuai.
* Peta menggunakan OpenStreetMap melalui React Leaflet sehingga tidak memerlukan API Key.
* File JSON kategori dibuat secara otomatis menggunakan `scripts/generate-data.js`.
