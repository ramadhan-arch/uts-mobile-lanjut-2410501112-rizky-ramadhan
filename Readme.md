# 📚 BookShelf

Aplikasi mobile untuk menemukan dan menyimpan buku favorit kamu!

## Identitas
- Nama: Rizky Ramadhan
- NIM: 2410501112
- Kelas: A
- Tema: Tema C — BookShelf (openlibrary.org)

---

## Tech Stack
- React Native + Expo SDK 52
- React Navigation (Stack + Bottom Tab)
- Context API + useReducer
- Open Library API (openlibrary.org)

---

## Cara Install & Run
1. Clone repository ini
   ```bash
   git clone https://github.com/ramadhan-arch/uts-mobile-lanjut-2410501112-rizky-ramadhan.git
   ```
2. Masuk ke folder project
   ```bash
   cd uts-mobile-lanjut-2410501112-rizky-ramadhan
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Jalankan aplikasi
   ```bash
   npx expo start
   ```
5. Scan QR code menggunakan Expo Go di HP

---

## Screenshots

| Home | Detail | Favorit |
|------|--------|---------|
| ![Home](screenshots/home.jpg) | ![Detail](screenshots/detail.jpg) | ![Favorit](screenshots/favorites.jpg) |

| Search | About |
|--------|-------|
| ![Search](screenshots/search.jpg) | ![About](screenshots/about.jpg) |

---

## Video Demo
[Link Video Demo](https://drive.google.com/file/d/1nlaNbfsOdejSpXbAIKxnFQfVFzAOGlRE/view?usp=drivesdk)

---

## Justifikasi State Management
Saya memilih Context API + useReducer karena aplikasi BookShelf memiliki skala yang sedang dan tidak terlalu kompleks. Context API sudah built-in di React Native tanpa perlu install library tambahan, sehingga lebih ringan dibanding Redux Toolkit. useReducer digunakan untuk mengelola state favorit karena polanya mirip Redux namun lebih sederhana. Kombinasi keduanya sudah cukup untuk kebutuhan aplikasi ini yaitu menyimpan dan menghapus buku favorit.

---

## Referensi
- [React Navigation Documentation](https://reactnavigation.org/docs)
- [Open Library API](https://openlibrary.org/developers/api)
- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

---

## Refleksi
Selama mengerjakan UTS ini, saya belajar banyak hal baru terutama tentang React Native dan Expo. Awalnya saya kesulitan memahami konsep navigation terutama kombinasi Stack Navigator dan Bottom Tab Navigator, namun setelah mencoba berkali-kali akhirnya saya paham alur navigasinya.

Tantangan terbesar yang saya hadapi adalah mengintegrasikan API dari Open Library karena struktur datanya berbeda dengan yang saya bayangkan. Saya harus memahami dulu struktur JSON yang dikembalikan API sebelum bisa menampilkan data dengan benar.

Untuk state management, saya memilih Context API + useReducer karena menurut saya paling sesuai untuk skala aplikasi ini. Saya juga belajar tentang pentingnya error handling dan loading state agar aplikasi tidak crash ketika koneksi internet bermasalah.

Secara keseluruhan, proyek ini sangat membantu saya memahami pengembangan aplikasi mobile secara nyata. Saya jadi lebih percaya diri untuk membuat aplikasi React Native ke depannya dan ingin terus belajar fitur-fitur yang lebih advanced seperti local storage dan autentikasi pengguna.